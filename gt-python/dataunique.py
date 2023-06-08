import os
import pandas as pd

root_folder = os.path.abspath(os.curdir)
processed_file = os.path.join(root_folder, 'datasets', 'processed', 'data1.txt')
new_file = os.path.join(root_folder, 'datasets', 'original_rent', 'data.txt')

isNew = False

if isNew == True:
    lines = pd.read_table(new_file, header=None, delimiter=None)[0].to_list()
else:
    # opening the file in read mode
    my_file = open(processed_file, "r", encoding='utf-8-sig')
    my_file.readline()
    # reading the file
    lines = my_file.read()
    
    # replacing end of line('/n') with ' ' and
    # splitting the text it further when '.' is seen.
    lines = lines.split("\n")

print(len(lines))
lines = list(set(lines))
print(len(lines))

file_log = open(processed_file, "a", encoding="utf-8-sig")
file_log.truncate(0)
if isNew == False:
    file_log.write('%s\t%s\n'%('s', 'review'))
for line in lines:
    line = line.strip()
    if len(line) > 1:
        file_log.write("%s\n" % (line))
file_log.close()