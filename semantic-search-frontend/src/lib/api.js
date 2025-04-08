
async function searchDocuments(query, page = 1, limit = 10, filters = {}) {
  try {
    const response = await fetch('http://localhost:5000/api/documents/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, page, limit, filters }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text(); // Read response as text
    const data = text ? JSON.parse(text) : {}; // Parse only if not empty

    return data;
  } catch (error) {
    console.error('Search error:', error);
    throw new Error(error.message || 'Failed to perform search');
  }
}

async function addDocument(title, content) {
  try {
    const response = await fetch('http://localhost:5000/api/documents', { // Updated base URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add document');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Add document error:', error);
    throw error;
  }
}

async function loginUser(email, password) {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

async function registerUser(userData) {
  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

export { searchDocuments, addDocument, loginUser, registerUser }
