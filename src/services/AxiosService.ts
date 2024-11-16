import axios from "axios";
export const loginaxios = async (url: string, payload: any) => {
  try {
    const res = await axios.post(url, payload);
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const postaxios = async (url: string, payload: any) => {
  try {
    const token: string | null = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }

    const res = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const getaxios = async (url: string, payload?: any) => {
  try {
    const token: string | null = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: payload,
    });

    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const putaxios = async (url: string, payload: any) => {
  try {
    const token: string | null = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }

    const res = await axios.put(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (err) {
    return err;
  }
};

export const patchaxios = async (url: string, payload: any) => {
  try {
    const token: string | null = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }

    const res = await axios.patch(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (err) {
    return err;
  }
};

export const deleteaxios = async (url: string) => {
  try {
    const token: string | null = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }

    const res = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (err) {
    return err;
  }
};
