import fasttext


model_2lop = fasttext.load_model('./chat/models/fasttext_model_2lop.bin')
model_dhct = fasttext.load_model('./chat/models/fasttext_model_dhct.bin')
model_tcntttt = fasttext.load_model('./chat/models/fasttext_model_tcntttt.bin')
model_tkt = fasttext.load_model('./chat/models/fasttext_model_tkt.bin')
model_tbk = fasttext.load_model('./chat/models/fasttext_model_tbk.bin')
model_tnn = fasttext.load_model('./chat/models/fasttext_model_tnn.bin')
model_kmttntn = fasttext.load_model('./chat/models/fasttext_model_kmttntn.bin')


class Classification():

    def get_intent_name_TCNTTTT(self, query):

        labels, probabilities = model_tcntttt.predict(query)

        print(f'Predicted label: {labels[0]}')
        print(f'Probability: {probabilities[0]}\n')

        return labels[0]

    def get_intent_name_TBK(self, query):
        labels, probabilities = model_tbk.predict(query)

        print(f'Predicted label: {labels[0]}')
        print(f'Probability: {probabilities[0]}\n')

        return labels[0]
        

    def get_intent_name_TKT(self, query):
        labels, probabilities = model_tkt.predict(query)

        print(f'Predicted label: {labels[0]}')
        print(f'Probability: {probabilities[0]}\n')

        return labels[0]

    def get_intent_name_TNN(self, query):
        labels, probabilities = model_tnn.predict(query)

        print(f'Predicted label: {labels[0]}')
        print(f'Probability: {probabilities[0]}\n')

        return labels[0]

    def get_intent_name_KMTTNTN(self, query):
        labels, probabilities = model_kmttntn.predict(query)

        print(f'Predicted label: {labels[0]}')
        print(f'Probability: {probabilities[0]}\n')

        return labels[0]
     
    def get_intent_name_DHCT(self, query):
        labels, probabilities = model_dhct.predict(query)

        print(f'Predicted label: {labels[0]}')
        print(f'Probability: {probabilities[0]}\n')

        return labels[0]
    
    def get_intent_name_2lop(self, query):
        labels, probabilities = model_2lop.predict(query)

        print(f'Predicted label: {labels[0]}')
        print(f'Probability: {probabilities[0]}\n')

        return labels[0]