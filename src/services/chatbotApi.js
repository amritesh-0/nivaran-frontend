const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ChatbotAPI {
  async sendQuery(query, userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/chatbot/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, userId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Query failed');
      }

      return data;
    } catch (error) {
      console.error('Error sending chatbot query:', error);
      throw error;
    }
  }
}

export default new ChatbotAPI();
