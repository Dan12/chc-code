f = open('crypt.pyc', 'r');

# 0,0,0x73
# 0,0x53,0x28

convert = [(0x99, 0x64),(0x86,0x6c),(0x88,0x84),(0x91,0x5a)]
# lookfor = [0x99,0x86,0x88,0x91,0x68,0x61,0x27,0x46,0x60,0x83,0x53]

ba = bytearray(f.read())
newArr = []
translating = False
for byte in ba:
    if not translating and byte == 0x73:
        if newArr[-1] == 0 and newArr[-2] == 0:
            translating = True
    if translating and byte == 0x28:
        if newArr[-1] == 0x53 and newArr[-2] == 0:
            translating = False

    if not translating:
        newArr.append(byte)
    else:
        converted = False
        for pair in convert:
            if byte == pair[0]:
                newArr.append(pair[1])
                converted = True
                break
        if not converted:
            newArr.append(byte)


fout = open('revcrypt.pyc', 'w')
newFileByteArray = bytearray(newArr)
fout.write(newFileByteArray)

f.close()
fout.close()
