import axios from "axios";

export async function apiCall(categoryOfItem, message) {
    // get data
    const response = await axios.get(`https://eldenring.fanapis.com/api/${categoryOfItem}?name=${message.content.slice(categoryOfItem.length + 1)}`);
    // format data
    const itemData = response.data;
    const data = itemData.data[0];
    return data;
}