export const createUser = async (userData) => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const fetchMembers = async (userId) => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/members/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch members');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching members:', error);
    return null;
  }
};


export const fetchUserData = async (email) => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/?email=${email}`);
    if (response.ok) {
      const userData = await response.json();

      return userData;
    } else {
      throw new Error('Failed to fetch user data');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch user data');
  }
};
