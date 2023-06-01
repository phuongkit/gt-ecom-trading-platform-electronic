import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from pyvi import ViTokenizer
import os

root_folder = os.path.abspath(os.curdir)
original_data_folder = os.path.join(root_folder, 'datasets', 'original')
processed_file = os.path.join(root_folder, 'datasets', 'processed', 'data.txt')
# processed_file = os.path.join(root_folder, 'datasets', 'processed', 'data1.txt')
file_stopwords = os.path.join(root_folder, 'stopwordvietnam.txt')

def get_stopwords_list(stop_file_path):
    """load stop words """
    
    with open(stop_file_path, 'r', encoding="utf-8") as f:
        stopwords = f.readlines()
        stop_set = set(m.strip() for m in stopwords)
        return list(frozenset(stop_set))
stopwords = get_stopwords_list(file_stopwords)

# print(f"Total number of stopwords: {stopwords}")


def words_preprocessor(text):

    # Tiền xử lý văn bản
    # Chuyển đổi văn bản thành chữ thường
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)

    # Tách từ với pyvi
    tokens = ViTokenizer.tokenize(text)

    # Tách từ thành danh sách các từ
    word_tokens = word_tokenize(tokens)
    word_tokens = [word.replace('_', ' ') if '_' in word else word for word in word_tokens]
    # Loại bỏ từ dừng

    filtered_text = [word for word in word_tokens if word not in stopwords]

    # Chuẩn hóa từ đối với tiếng ah
    lemmatizer = WordNetLemmatizer()
    normalized_text = [lemmatizer.lemmatize(word) for word in filtered_text]

    # Ghép lại thành một chuỗi văn bản
    processed_text = ' '.join(normalized_text)

    # In ra kết quả xử lý
    # print(processed_text)
    return processed_text

def data_preprocessing(file_log):
    file_list = os.listdir(original_data_folder)
    for file_name in file_list:
        file_path = os.path.join(original_data_folder, file_name)
        file_list_child = os.listdir(file_path)
        for file_name_child in file_list_child:
            file_path_child = os.path.join(file_path, file_name_child)
            with open(file_path_child, 'r', encoding='utf-8-sig') as file:  # Specify the correct encoding (e.g., utf-8-sig)
                text = file.read()
                result = words_preprocessor(text)
                score = int(file_name) + 1
                score = score if score < 3 else 2
                file_log.write('%s\t%s\n'%(score, result))

if __name__=="__main__":
    file_log = open(processed_file, "a", encoding="utf-8-sig")
    file_log.truncate(0)
    file_log.write('%s\t%s\n'%('s', 'review'))
    data_preprocessing(file_log)
    # original_data_folder = original_data_folder + '1'
    # data_preprocessing(file_log)
    file_log.close()

