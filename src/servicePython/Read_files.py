#!/usr/bin/env python
# coding: utf-8

# In[25]:


import glob
import numpy
import nltk
from nltk.corpus import stopwords
import os

transcripciones = []
files = glob.glob("/Volumes/ANDRES/Universidad/Practica/Test/my_api/outData/1/*.txt")
open_file = ""

for file in files:
    open_file = open(file)
    transcripciones.append(open_file.read())
    open_file.close()
    
i = 0
outPut = "";
for transcripcion in transcripciones:
    #Convertir texto en tokens diviendo el texto
    tokens = [t for t in transcripcion.split()]
    #Eliminar Stop Words
    clean_tokens = tokens[:]
    sr = stopwords.words('spanish')
    salida = ''
    for token in clean_tokens:
        if token in stopwords.words('spanish'):
            clean_tokens.remove(token)
    freq = nltk.FreqDist(clean_tokens)
    outPut=""
    for key, value in freq.items():
        outPut = outPut + " "+ key
    file = open(informacion, "w")
    file.write(str(outPut))
    file.close()
    i=i+1
    print(i)

    


# In[ ]:




