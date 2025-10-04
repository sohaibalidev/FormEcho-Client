// src/pages/Messages/index.jsx
import React, { useEffect, useState } from "react";
import { useApi } from "../../contexts/ApiContext";
import { Mail, Calendar, Search } from "lucide-react";
import LoadingSpinner from "../../components/LoadingSpinner";
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
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Form Submissions</h1>
          <p className={styles.subtitle}>View all messages from your forms</p>
        </div>
      </div>

      {/* Search */}
      <div className="card">
        <div className={styles.searchContainer}>
          <div className={styles.searchInputWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="card">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>All Submissions</h2>
        </div>

        <div className={styles.messagesContent}>
          {loading ? (
            <LoadingSpinner />
          ) : filteredMessages.length > 0 ? (
            <div className={styles.messagesList}>
              {filteredMessages.map((message) => (
                <div key={message._id} className={styles.messageCard}>
                  <div className={styles.messageHeader}>
                    <div>
                      <h3 className={styles.messageName}>{message.name}</h3>
                      <p className={styles.messageEmail}>{message.email}</p>
                    </div>
                    <div className={styles.messageDate}>
                      <Calendar size={16} className={styles.dateIcon} />
                      {new Date(message.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {message.message && (
                    <div className={styles.messageBody}>
                      <p className={styles.messageText}>{message.message}</p>
                    </div>
                  )}

                  {message.fields && Object.keys(message.fields).length > 0 && (
                    <div className={styles.formData}>
                      <h4 className={styles.formDataTitle}>Form Data:</h4>
                      <div className={styles.formDataGrid}>
                        {Object.entries(message.fields).map(([key, value]) => (
                          <div key={key} className={styles.formDataItem}>
                            <span className={styles.formDataKey}>{key}:</span>
                            <span className={styles.formDataValue}>
                              {String(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <Mail className={styles.emptyIcon} />
              <p className={styles.emptyText}>No messages found</p>
              <p className={styles.emptyDescription}>
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Form submissions will appear here"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
