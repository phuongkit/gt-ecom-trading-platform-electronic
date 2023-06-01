import os
import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from pyvi import ViTokenizer
from gensim.models import FastText
from keras.preprocessing.text import Tokenizer
from keras.utils.data_utils import pad_sequences
from keras.models import Sequential
from keras.layers import Embedding, LSTM, Dense, Dropout
import pickle

root_folder = os.path.abspath(os.curdir)

# Set the path to the FastText pretrained model
fasttext_model_path = os.path.join(root_folder, 'fasttext', 'cc.vi.300.bin')

processed_file = os.path.join(root_folder, 'datasets', 'processed', 'data.txt')

# Load and preprocess the data
df = pd.read_fwf(processed_file)
df = df[['s', 'review']]
df['sentiment'] = df['s'].map({ 0: 'negative',1: 'positive', 2: 'very positive' })
df = df[['review', 'sentiment']]
df = df.sample(frac=1).reset_index(drop=True)
# print(df.head())

# Handle missing values
df['review'] = df['review'].fillna('')  # Replace NaN values with empty string

# Tokenize and preprocess Vietnamese text
df['review'] = df['review'].apply(lambda x: ViTokenizer.tokenize(str(x)))

# Split into training and test sets
x_train, x_test, y_train, y_test = train_test_split(df['review'], df['sentiment'], test_size=0.2)

# Convert sentiment labels to numeric values
label_encoder = LabelEncoder()
y_train = label_encoder.fit_transform(y_train)
y_test = label_encoder.transform(y_test)

# Apply word embedding using FastText
fasttext_model = FastText.load_fasttext_format(fasttext_model_path)

tokenizer = Tokenizer()
tokenizer.fit_on_texts(x_train)

vocab_size = len(tokenizer.word_index) + 1
embedding_matrix = np.zeros((vocab_size, 300))
for word, i in tokenizer.word_index.items():
    if word in fasttext_model.wv:
        embedding_matrix[i] = fasttext_model.wv[word]

x_train = tokenizer.texts_to_sequences(x_train)
x_test = tokenizer.texts_to_sequences(x_test)

max_sequence_length = 1500  # Set the maximum sequence length for padding

x_train = pad_sequences(x_train, maxlen=max_sequence_length)
x_test = pad_sequences(x_test, maxlen=max_sequence_length)

# Define the model
model = Sequential()
model.add(Embedding(vocab_size, 300, weights=[embedding_matrix], input_length=max_sequence_length, trainable=False))
model.add(LSTM(64, return_sequences=True))
model.add(LSTM(32))
model.add(Dense(32, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(3, activation='softmax'))
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.summary()

# Train the model
model.fit(x_train, y_train, epochs=10, batch_size=32, validation_data=(x_test, y_test))

# Evaluate the model
_, accuracy = model.evaluate(x_test, y_test)
print("Accuracy:", accuracy)

# Save the model
model.save('sentiment_analysis_model.h5')
with open('tokenizer.pickle', 'wb') as handle:
    pickle.dump(tokenizer, handle, protocol=pickle.HIGHEST_PROTOCOL)
