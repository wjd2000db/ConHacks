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
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_SERVER_URL}/members/${userId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch members");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching members:", error);
    return null;
  }
};

export const fetchUserData = async (email) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_SERVER_URL}/?email=${email}`
    );
    if (response.ok) {
      const userData = await response.json();

      return userData;
    } else {
      throw new Error("Failed to fetch user data");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user data");
  }
};

export const createMember = async (memberData) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_SERVER_URL}/members`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memberData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create member");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating member:", error);
    throw error;
  }
};

export const createMedication = async (mediName) => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/medication/${mediName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to create medication");
    }

    return await response.json(); 
  } catch (error) {
    console.error("Error creating medication:", error);
    throw error;
  }
};

export const getMedication = async (mediName) => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/medication/${mediName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to create medication");
    }

    return await response.json(); 
  } catch (error) {
    console.error("Error creating medication:", error);
    throw error;
  }
};

export const addMedicationToMember = async (id, mediName) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_SERVER_URL}/members/${id}/${mediName}`,
      {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add medication");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding medication to member:", error);
    throw error;
  }
};
