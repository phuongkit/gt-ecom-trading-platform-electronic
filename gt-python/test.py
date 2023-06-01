# # # Load the saved model and tokenizer
import keras
import pickle
import numpy as np
from keras.utils.data_utils import pad_sequences
from validator import words_preprocessor

model = keras.models.load_model('sentiment_analysis_model.h5')
with open('tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

def predict_sentiment(text):
    # Tokenize and pad the input text
    print(text)
    text = words_preprocessor(text)
    print(text)
    text_sequence = tokenizer.texts_to_sequences([text])
    text_sequence = pad_sequences(text_sequence, maxlen=1500)

    # Make a prediction using the trained model
    predicted_rating = model.predict(text_sequence)[0]
    if np.argmax(predicted_rating) == 0:
        return 'Negative'
    elif np.argmax(predicted_rating) == 1:
        return 'Positive'
    elif np.argmax(predicted_rating) == 2:
        return 'very Positive'
    else:
        return 'UnKnown'

text_input = "đt mượt xài tụt pin m tải ứng dụng tụt 10 pin"
predicted_sentiment = predict_sentiment(text_input)
print(predicted_sentiment)