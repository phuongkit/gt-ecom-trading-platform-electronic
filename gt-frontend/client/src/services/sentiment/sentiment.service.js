import axios from 'axios';
import { SENTIMENT_STRING_ARRAY_URL, SENTIMENT_STRING_URL } from '../../utils';

const axiosPython = axios.create({
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export const sentimentService = {
    getSentimentByString(text) {
        return axiosPython.get(SENTIMENT_STRING_URL + text)
    },
    getSentimentByStringArray(arr) {
        return axiosPython.post(SENTIMENT_STRING_ARRAY_URL, arr)
    }
}