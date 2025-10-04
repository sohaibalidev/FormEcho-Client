import { useEffect, useState } from "react";
import { useApi } from "@/contexts/ApiContext";
import { MessagesHeader } from "./components/MessagesHeader/MessagesHeader";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { MessagesList } from "./components/MessagesList/MessagesList";
import styles from "./Messages.module.css";

const Messages = () => {
  const { messages, getMessages, loading } = useApi();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getMessages(currentPage);
  }, [currentPage]);

  const filteredMessages = messages.filter(
    (message) =>
      message.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <MessagesHeader />

      <div className="card">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      <div className="card">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>All Submissions</h2>
        </div>

        <MessagesList
          messages={filteredMessages}
          loading={loading}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
};

export default Messages;
