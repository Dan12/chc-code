from os import urandom

def str2num(s):
    return int(s.encode('hex'), 16)

def num2str(i):
    ret = ''
    while(i != 0):
        ret = str(unichr(i&255))+ret
        i = i >> 8
    return ret


P = 0x10000000000000000000000000000000000000000000000000000000000000425L
fake_secret1 = "I_am_not_a_secret_so_you_know_me"
fake_secret2 = "feeddeadbeefcafefeeddeadbeefcafe"
cipher_s1 = 0x630eb4dce274d29a16f86940f2f35253477665949170ed9e8c9e828794b5543c
cipher_s2 = 0xe913db07cbe4f433c7cdeaac549757d23651ebdccf69d7fbdfd5dc2829334d1b

key2 = str2num(fake_secret1) ^ cipher_s1
key3 = str2num(fake_secret2) ^ cipher_s2

reverse = cipher_s1 ^ key2
reverse2 = cipher_s2 ^ key3
# print key2
# print key3
# print num2str(reverse)
# print num2str(reverse2)

def pad(i, num=16, tobin=True):
    if(tobin):
        ret = bin(i)[2:]
    else:
        ret = str(i)
    while(len(ret) < num):
        ret = '0'+ret

    return ret

def process(tmp, res, P, size=256):
    for i in bin(tmp)[2:]:
        res = res << 1;
        if (int(i)):
            res = res ^ tmp
        if (res >> size):
            res = res ^ P
    return res

def reverse(res, tmp, P, size=256):
    tmpInd = 0
    initres = res

    flipBox = 0

    ret = [res]
    for i in bin(tmp)[-1:1:-1]:
        # if 1st bit is a 1
        testres = res
        # try res >> 256
        testres = testres ^ P
        if(testres >> size == 0):
            print('invalid shift')
        if (int(i)):
            testres = testres ^ tmp

        # if first byte is 1, try no res >> 256
        if(testres&1):
            testres = res
            if (int(i)):
                testres = testres ^ tmp

        # add to parity
        flipBox = flipBox ^ ((testres ^ res) << tmpInd)

        res = testres >> 1
        tmpInd+=1
        ret.append(res)

    if(res == 0):
        # found key
        print(pad(tmp, size))

    return ret, flipBox

# for i in range(0,100000000):
#     reverse(key3, i, P)

testtmp = str2num(urandom(1))
P = 0x109
res = process(testtmp, 0, P, 8)
print pad(res, 8)

print ""

tmp = str2num(urandom(1))

arr1, flip1 = reverse(res, tmp, P, 8)
tmp2 = tmp ^ (0b100)
arr2, flip2 = reverse(res, tmp2, P, 8)
print(pad(tmp, 8)+'   '+pad(tmp2, 8))
print pad(flip1,16)
print "           "+pad(flip2,16)
print(pad(arr1[-1], 8)+'   '+pad(arr2[-1], 8))
# print ""
# for i in range(0, len(arr1)):
#     print(pad(arr1[i], 8)+'   '+pad(arr2[i], 8))

print ""
# find testtmp
for i in range(0,int(pow(2,8))):
    testtmp = i
    testtmptest = testtmp
    tmpres = reverse(res, testtmptest, P, 8)
