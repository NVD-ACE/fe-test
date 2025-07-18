import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getGalleries = async () => {
    try{
        const response = await axios.get(`${API_URL}/galleries`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
    })
        if (response.status === 200) {
            return response.data;
        } else {
            console.error("Failed to fetch galleries:", response.statusText);
        }
    }catch (error) {
        console.error("Error fetching galleries:", error);
        throw error;
    }
}