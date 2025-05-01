
import React, { useState } from 'react';
import { ArrowRight, Send, Paperclip, Phone, Video, MoreVertical, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavigationBar from "@/components/NavigationBar";
import { Avatar } from "@/components/ui/avatar";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: "user" | "other";
}

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  lastSeen: string;
  unreadCount?: number;
  online: boolean;
  department?: string;
}

const Chat = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "c1",
      name: "قسم القبول والتسجيل",
      lastMessage: "يمكنكم مراجعة القسم غداً في الساعة 10",
      lastSeen: "منذ 30 دقيقة",
      unreadCount: 2,
      online: true,
      department: "الإدارة"
    },
    {
      id: "c2",
      name: "د. محمد علي",
      lastMessage: "تم استلام المشروع، شكراً",
      lastSeen: "منذ ساعة",
      online: false,
      department: "قسم علوم الحاسوب"
    },
    {
      id: "c3",
      name: "المكتبة المركزية",
      lastMessage: "الكتب المطلوبة متوفرة حالياً",
      lastSeen: "أمس",
      online: true,
      department: "المكتبة"
    }
  ]);
  
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    // Load messages for this contact
    setMessages([
      {
        id: "m1",
        content: "مرحباً، كيف يمكنني مساعدتك؟",
        timestamp: "10:30 AM",
        sender: "other"
      },
      {
        id: "m2",
        content: "أريد الاستفسار عن موعد الاختبارات النهائية",
        timestamp: "10:32 AM",
        sender: "user"
      },
      {
        id: "m3",
        content: "الاختبارات النهائية ستبدأ في 15 يونيو وتستمر لمدة أسبوعين",
        timestamp: "10:35 AM",
        sender: "other"
      }
    ]);
    
    // Mark messages as read
    if (contact.unreadCount) {
      setContacts(contacts.map(c => 
        c.id === contact.id ? {...c, unreadCount: 0} : c
      ));
    }
  };
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;
    
    const newMsg: Message = {
      id: `m${messages.length + 1}`,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      sender: "user"
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
    
    // Simulate reply after 1 second
    setTimeout(() => {
      const replyMsg: Message = {
        id: `m${messages.length + 2}`,
        content: "شكراً للتواصل، سيتم الرد قريباً",
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        sender: "other"
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1000);
  };
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="container pb-20 pt-4">
      <div className="flex items-center mb-6">
        <Link to="/" className="ml-2">
          <ArrowRight className="h-6 w-6 text-gray-700" />
        </Link>
        <h1 className="text-2xl font-bold">المحادثات والدعم</h1>
      </div>
      
      {!selectedContact ? (
        <>
          <div className="mb-4 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="البحث"
              className="w-full p-2 pr-10 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            {filteredContacts.map(contact => (
              <div 
                key={contact.id} 
                className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => handleContactSelect(contact)}
              >
                <div className="relative mr-3">
                  <Avatar className="h-12 w-12">
                    <div className="h-full w-full rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-lg font-medium">
                      {contact.avatar ? 
                        <img src={contact.avatar} alt={contact.name} className="h-full w-full object-cover" /> : 
                        contact.name.charAt(0)
                      }
                    </div>
                  </Avatar>
                  {contact.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
                
                <div className="flex-1 ml-3">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{contact.name}</h3>
                    <span className="text-xs text-gray-500">{contact.lastSeen}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                  {contact.department && (
                    <p className="text-xs text-teal-600">{contact.department}</p>
                  )}
                </div>
                
                {contact.unreadCount && (
                  <div className="bg-teal-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {contact.unreadCount}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="h-[calc(100vh-180px)] flex flex-col">
          {/* Contact header */}
          <div className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center" onClick={() => setSelectedContact(null)}>
              <Avatar className="h-10 w-10 mr-3">
                <div className="h-full w-full rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-lg font-medium">
                  {selectedContact.avatar ? 
                    <img src={selectedContact.avatar} alt={selectedContact.name} className="h-full w-full object-cover" /> : 
                    selectedContact.name.charAt(0)
                  }
                </div>
              </Avatar>
              <div>
                <h3 className="font-medium">{selectedContact.name}</h3>
                <p className="text-xs text-gray-500">
                  {selectedContact.online ? "متصل الآن" : selectedContact.lastSeen}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Phone className="h-5 w-5 text-teal-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Video className="h-5 w-5 text-teal-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreVertical className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map(message => (
              <div 
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.sender === "user" 
                      ? "bg-teal-500 text-white" 
                      : "bg-white border"
                  }`}
                >
                  <p>{message.content}</p>
                  <p className={`text-xs text-right mt-1 ${
                    message.sender === "user" ? "text-teal-100" : "text-gray-500"
                  }`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Message input */}
          <div className="border-t p-3 bg-white">
            <div className="flex items-center">
              <button className="p-2 hover:bg-gray-100 rounded-full mr-2">
                <Paperclip className="h-5 w-5 text-gray-500" />
              </button>
              <input
                type="text"
                placeholder="اكتب رسالة..."
                className="flex-1 p-2 border rounded-lg"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <button 
                className="p-2 bg-teal-500 text-white rounded-full ml-2 disabled:opacity-50"
                disabled={!newMessage.trim()}
                onClick={handleSendMessage}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      <NavigationBar />
    </div>
  );
};

export default Chat;
