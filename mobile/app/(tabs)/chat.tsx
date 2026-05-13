import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, FlatList, KeyboardAvoidingView,
  Platform, Dimensions,
} from 'react-native';
import Colors from '../../constants/Colors';
import {
  mockContacts, chatAutoReplies,
  type ChatContact, type ChatMessage,
} from '../../constants/Data';

const { width } = Dimensions.get('window');

export default function ChatScreen() {
  const [contacts, setContacts] = useState<ChatContact[]>(mockContacts);
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [newMsg, setNewMsg] = useState('');
  const [searchQ, setSearchQ] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'farmer' | 'buyer'>('all');
  const flatListRef = useRef<FlatList>(null);

  const activeContact = contacts.find((c) => c.id === activeChat);
  const totalUnread = contacts.reduce((sum, c) => sum + c.unread, 0);

  const filteredContacts = contacts
    .filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(searchQ.toLowerCase()) ||
        (c.product || '').toLowerCase().includes(searchQ.toLowerCase());
      const matchRole = filterRole === 'all' || c.role === filterRole;
      return matchSearch && matchRole;
    })
    .sort((a, b) => b.unread - a.unread);

  useEffect(() => {
    if (activeContact) {
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [activeChat, contacts]);

  const sendMessage = () => {
    if (!newMsg.trim() || !activeChat) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    setContacts((prev) =>
      prev.map((c) => {
        if (c.id !== activeChat) return c;
        return {
          ...c,
          lastMessage: newMsg,
          lastTime: 'Just now',
          unread: 0,
          messages: [
            ...c.messages,
            { id: c.messages.length + 1, text: newMsg, sender: 'me' as const, time: timeStr, status: 'sent' as const },
          ],
        };
      })
    );
    setNewMsg('');

    // Auto-reply after 2s
    setTimeout(() => {
      const reply = chatAutoReplies[Math.floor(Math.random() * chatAutoReplies.length)];
      setContacts((prev) =>
        prev.map((c) => {
          if (c.id !== activeChat) return c;
          return {
            ...c,
            lastMessage: reply,
            lastTime: 'Just now',
            messages: [
              ...c.messages,
              {
                id: c.messages.length + 2,
                text: reply,
                sender: 'them' as const,
                time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
                status: 'read' as const,
              },
            ],
          };
        })
      );
    }, 2000);
  };

  // Contact List View
  if (!activeContact) {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>💬 Inbox</Text>
            {totalUnread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadBadgeText}>{totalUnread}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Text style={{ fontSize: 14 }}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
            placeholderTextColor={Colors.slate[400]}
            value={searchQ}
            onChangeText={setSearchQ}
          />
        </View>

        {/* Role Filter */}
        <View style={styles.roleFilterRow}>
          {(['all', 'farmer', 'buyer'] as const).map((role) => (
            <TouchableOpacity
              key={role}
              style={[styles.roleChip, filterRole === role && styles.roleChipActive]}
              onPress={() => setFilterRole(role)}
            >
              <Text style={[styles.roleChipText, filterRole === role && styles.roleChipTextActive]}>
                {role === 'all' ? 'All' : role === 'farmer' ? '🌾 Farmers' : '🏪 Buyers'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact List */}
        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.contactList}
          renderItem={({ item: contact }) => (
            <TouchableOpacity
              style={[styles.contactItem, activeChat === contact.id && styles.contactItemActive]}
              activeOpacity={0.7}
              onPress={() => {
                setActiveChat(contact.id);
                setContacts((p) => p.map((c) => (c.id === contact.id ? { ...c, unread: 0 } : c)));
              }}
            >
              {/* Avatar */}
              <View style={styles.avatarWrap}>
                <View style={styles.avatar}>
                  <Text style={{ fontSize: 22 }}>{contact.avatar}</Text>
                </View>
                {contact.online && <View style={styles.onlineDot} />}
              </View>

              {/* Info */}
              <View style={styles.contactInfo}>
                <View style={styles.contactTopRow}>
                  <View style={styles.nameRow}>
                    <Text style={styles.contactName} numberOfLines={1}>{contact.name}</Text>
                    {contact.verified && <Text style={{ fontSize: 12 }}>✅</Text>}
                  </View>
                  <Text style={styles.timeText}>{contact.lastTime}</Text>
                </View>
                {contact.product && (
                  <Text style={styles.productTag} numberOfLines={1}>{contact.product}</Text>
                )}
                <View style={styles.contactBottomRow}>
                  <Text style={styles.lastMsg} numberOfLines={1}>{contact.lastMessage}</Text>
                  {contact.unread > 0 && (
                    <View style={styles.contactUnread}>
                      <Text style={styles.contactUnreadText}>{contact.unread}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  // Chat View
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Chat Header */}
      <View style={styles.chatHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setActiveChat(null)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={{ fontSize: 20 }}>←</Text>
        </TouchableOpacity>
        <View style={styles.avatarWrap}>
          <View style={styles.avatarSmall}>
            <Text style={{ fontSize: 18 }}>{activeContact.avatar}</Text>
          </View>
          {activeContact.online && <View style={styles.onlineDotSmall} />}
        </View>
        <View style={styles.chatHeaderInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.chatHeaderName}>{activeContact.name}</Text>
            {activeContact.verified && <Text style={{ fontSize: 12 }}>✅</Text>}
            <View style={[styles.rolePill, activeContact.role === 'farmer' ? styles.roleFarmer : styles.roleBuyer]}>
              <Text style={[styles.rolePillText, activeContact.role === 'farmer' ? styles.roleFarmerText : styles.roleBuyerText]}>
                {activeContact.role === 'farmer' ? 'Farmer' : 'Buyer'}
              </Text>
            </View>
          </View>
          <Text style={styles.chatHeaderMeta}>
            📍 {activeContact.location} • ⭐ {activeContact.rating} •{' '}
            <Text style={activeContact.online ? styles.onlineText : undefined}>
              {activeContact.online ? 'Online' : 'Offline'}
            </Text>
          </Text>
        </View>
      </View>

      {/* Product Banner */}
      {activeContact.product && (
        <View style={styles.productBanner}>
          <Text style={styles.productBannerText}>🌿 Discussing: {activeContact.product}</Text>
        </View>
      )}

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={activeContact.messages}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.messagesList}
        renderItem={({ item: msg }) => (
          <View style={[styles.msgRow, msg.sender === 'me' ? styles.msgRowMe : styles.msgRowThem]}>
            <View style={[styles.msgBubble, msg.sender === 'me' ? styles.bubbleMe : styles.bubbleThem]}>
              <Text style={[styles.msgText, msg.sender === 'me' ? styles.msgTextMe : styles.msgTextThem]}>
                {msg.text}
              </Text>
              <View style={styles.msgMeta}>
                <Text style={[styles.msgTime, msg.sender === 'me' ? styles.msgTimeMe : styles.msgTimeThem]}>
                  {msg.time}
                </Text>
                {msg.sender === 'me' && (
                  <Text style={{ fontSize: 10, marginLeft: 4 }}>
                    {msg.status === 'read' ? '✓✓' : msg.status === 'delivered' ? '✓✓' : '✓'}
                  </Text>
                )}
              </View>
            </View>
          </View>
        )}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
      />

      {/* Input */}
      <View style={styles.inputBar}>
        <TextInput
          style={styles.msgInput}
          placeholder="Type a message..."
          placeholderTextColor={Colors.slate[400]}
          value={newMsg}
          onChangeText={setNewMsg}
          multiline
          returnKeyType="send"
          onSubmitEditing={sendMessage}
          blurOnSubmit={false}
        />
        <TouchableOpacity
          style={[styles.sendButton, !newMsg.trim() && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!newMsg.trim()}
          activeOpacity={0.7}
        >
          <Text style={{ fontSize: 18 }}>📤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  // Header
  header: {
    backgroundColor: Colors.green[800],
    paddingTop: Platform.OS === 'ios' ? 60 : 48,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: Colors.white },
  unreadBadge: {
    width: 24, height: 24, borderRadius: 12, backgroundColor: Colors.green[500],
    alignItems: 'center', justifyContent: 'center',
  },
  unreadBadgeText: { color: Colors.white, fontSize: 11, fontWeight: '800' },

  // Search
  searchBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    marginHorizontal: 16, marginTop: 16,
    backgroundColor: Colors.white, borderRadius: 14,
    paddingHorizontal: 14, height: 44,
    borderWidth: 1, borderColor: Colors.slate[200],
  },
  searchInput: { flex: 1, fontSize: 14, color: Colors.slate[800] },

  // Role Filter
  roleFilterRow: { flexDirection: 'row', paddingHorizontal: 16, marginTop: 12, gap: 6 },
  roleChip: {
    flex: 1, paddingVertical: 8, borderRadius: 10,
    backgroundColor: Colors.slate[100], alignItems: 'center',
  },
  roleChipActive: { backgroundColor: Colors.green[600] },
  roleChipText: { fontSize: 12, fontWeight: '600', color: Colors.slate[500] },
  roleChipTextActive: { color: Colors.white },

  // Contact List
  contactList: { paddingTop: 8, paddingBottom: 20 },
  contactItem: {
    flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 14,
    gap: 12, borderBottomWidth: 1, borderBottomColor: Colors.slate[50],
  },
  contactItemActive: { backgroundColor: Colors.green[50] },

  avatarWrap: { position: 'relative' },
  avatar: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: Colors.green[50],
    alignItems: 'center', justifyContent: 'center',
  },
  onlineDot: {
    position: 'absolute', bottom: 0, right: 0,
    width: 14, height: 14, borderRadius: 7,
    backgroundColor: Colors.green[500],
    borderWidth: 2, borderColor: Colors.white,
  },

  contactInfo: { flex: 1 },
  contactTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 4, flex: 1 },
  contactName: { fontSize: 14, fontWeight: '700', color: Colors.slate[900], maxWidth: 160 },
  timeText: { fontSize: 11, color: Colors.slate[400] },
  productTag: { fontSize: 11, color: Colors.green[600], fontWeight: '600', marginBottom: 2 },
  contactBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  lastMsg: { fontSize: 12, color: Colors.slate[500], flex: 1, marginRight: 8 },
  contactUnread: {
    width: 22, height: 22, borderRadius: 11, backgroundColor: Colors.green[500],
    alignItems: 'center', justifyContent: 'center',
  },
  contactUnreadText: { color: Colors.white, fontSize: 10, fontWeight: '800' },

  // Chat Header
  chatHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingTop: Platform.OS === 'ios' ? 56 : 44,
    paddingBottom: 12, paddingHorizontal: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1, borderBottomColor: Colors.slate[100],
  },
  backButton: { padding: 4 },
  avatarSmall: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.green[50],
    alignItems: 'center', justifyContent: 'center',
  },
  onlineDotSmall: {
    position: 'absolute', bottom: 0, right: 0,
    width: 12, height: 12, borderRadius: 6,
    backgroundColor: Colors.green[500],
    borderWidth: 2, borderColor: Colors.white,
  },
  chatHeaderInfo: { flex: 1 },
  chatHeaderName: { fontSize: 15, fontWeight: '700', color: Colors.slate[900] },
  chatHeaderMeta: { fontSize: 11, color: Colors.slate[500], marginTop: 2 },
  onlineText: { color: Colors.green[600] },
  rolePill: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  roleFarmer: { backgroundColor: Colors.green[100] },
  roleBuyer: { backgroundColor: Colors.blue[100] },
  rolePillText: { fontSize: 10, fontWeight: '600' },
  roleFarmerText: { color: Colors.green[700] },
  roleBuyerText: { color: Colors.blue[700] },

  // Product Banner
  productBanner: {
    backgroundColor: Colors.green[50],
    paddingHorizontal: 16, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: Colors.green[100],
  },
  productBannerText: { fontSize: 12, fontWeight: '600', color: Colors.green[700] },

  // Messages
  messagesList: { padding: 16, paddingBottom: 8 },
  msgRow: { marginBottom: 10 },
  msgRowMe: { alignItems: 'flex-end' },
  msgRowThem: { alignItems: 'flex-start' },
  msgBubble: {
    maxWidth: '78%',
    paddingHorizontal: 14, paddingVertical: 10,
    borderRadius: 18,
  },
  bubbleMe: {
    backgroundColor: Colors.green[600],
    borderBottomRightRadius: 6,
  },
  bubbleThem: {
    backgroundColor: Colors.white,
    borderWidth: 1, borderColor: Colors.slate[200],
    borderBottomLeftRadius: 6,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 3,
    elevation: 1,
  },
  msgText: { fontSize: 14, lineHeight: 20 },
  msgTextMe: { color: Colors.white },
  msgTextThem: { color: Colors.slate[800] },
  msgMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  msgTime: { fontSize: 10 },
  msgTimeMe: { color: Colors.green[200] },
  msgTimeThem: { color: Colors.slate[400] },

  // Input Bar
  inputBar: {
    flexDirection: 'row', alignItems: 'flex-end', gap: 10,
    paddingHorizontal: 16, paddingVertical: 12,
    backgroundColor: Colors.white,
    borderTopWidth: 1, borderTopColor: Colors.slate[100],
  },
  msgInput: {
    flex: 1, backgroundColor: Colors.slate[50],
    borderRadius: 18, paddingHorizontal: 16, paddingVertical: 12,
    fontSize: 14, color: Colors.slate[800],
    maxHeight: 100,
    borderWidth: 1, borderColor: Colors.slate[200],
  },
  sendButton: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: Colors.green[600],
    alignItems: 'center', justifyContent: 'center',
    shadowColor: Colors.green[500],
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4,
    elevation: 3,
  },
  sendButtonDisabled: { opacity: 0.4 },
});
