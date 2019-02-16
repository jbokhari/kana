def dirReduc(arr):
  t = []
  for i in arr :
    if len(t)>0:
      h, j = t[-1][-1],t[-1][0]
    else : 
      h, j = '','';
    n, o = i[-1],i[0]
    b = t.pop() if (h==n and j!=o) else t.append(i)
  return t