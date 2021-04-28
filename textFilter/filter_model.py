import torch
from transformers import BertTokenizer, BertModel
from sklearn.svm import OneClassSVM
import numpy as np

from pdb import set_trace as bk

class Fitler:
    def __init__(self):
        # load bert model
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
        self.model = BertModel.from_pretrained('bert-base-uncased') 

        self.nu = 0.99 # tune this to determine the fraction of outliers
        self.detector = OneClassSVM(nu=self.nu)
        self.compute_anomly_detection_model()


    def bert_embed(self, msg):
        inputs = self.tokenizer(msg, return_tensors="pt")
        outputs = self.model(**inputs)
        return outputs.pooler_output.squeeze().detach().numpy() # [hidden_size:768]

        
    # TODO: switch to the data base
    def get_training_data(self):
        return np.random.normal(0, 1, (100, 768)) # [batch_size, hidden_size]

    def compute_anomly_detection_model(self):
        data = self.get_training_data()
        self.detector.fit(data)

    def filter_msg(self, msg):
        embeddings = self.bert_embed(msg)
        is_outlier = self.detector.predict([embeddings])[0]

        return {'isOutlier': True} if is_outlier == -1 else {'isOutlier': False}


# init
filter = Fitler()

if __name__ == '__main__':
    print(filter.filter_msg("Hello, my dog is cute."))

    