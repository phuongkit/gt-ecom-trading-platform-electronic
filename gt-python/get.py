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
processed_file = root_folder + '\datasets\sentiment.txt'

# Load and preprocess the data
df = pd.read_fwf(os.path.join(root_folder, 'datasets', 'processed', 'data3.txt'))
df = df[['s', 'review']]
df['sentiment'] = df['s'].map({1: 2, 2: 2, 0: 0})
df = df[['review', 'sentiment']]
df = df.sample(n = 200)
df = df.sample(frac=1).reset_index(drop=True)
file_log = open(processed_file, "a", encoding="utf-8-sig")
file_log.truncate(0)
for i in range(0, int(df.size/2)):
    file_log.write('%s%s\n'%(df['sentiment'][i], df['review'][i]))
file_log.close()
exit()