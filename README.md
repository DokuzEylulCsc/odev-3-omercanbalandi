`Ömercan Balandı ` `2018280065`

`NodeJS` v12.13.1 ile test edilmiştir.

### Kullanım

Dosya yolu komut satırı argumanı olarak alınmaktadır.



```bash
npm run execute <dosya-yolu>
npm run execute ./input.txt
```

ya da

```bash
node ./index.js <dosya-yolu>
node ./index.js ./input.txt
```

şeklinde çalıştırılabilir.

# Ödev3(Son Teslim Tarihi:02.01.2020)

Bu ödevde belirli bir cevap anahtarına göre bir sınıfın test sınavının cevaplarını otomatik olarak değerlendiren bir program yazmanız istenmektedir. Kodlamayı sadece C++ veya JavaScript dillerinden biriyle yapmanız beklenmektedir. Programınız girdi ve çıktı işlemlerini metin dosyaları üzerinden gerçekleştirecektir. 
Programınız alacağı girdi dosyasının ilk satırında sınavdaki toplam soru sayısı olacaktır. İkinci satırında ise sınavın cevap anahtarı bulunacaktır. Buradan sonraki satırlar ise her bir öğrencinin cevaplarını temsil edecektir. Satırın başındaki ilk değer, cevabı okunan öğrencinin numarası olacaktır. Sonrasında ise satır sonuna kadar öğrencinin cevapları olacaktır. Öğrenci boş cevap da vermiş olabilir. Örnek bir girdiği aşağıda görebilirsiniz:

10
B,A,D,D,C,B,D,A,C,C
N00000002,B,,D,D,C,B,D,A,C,D
N00000023,,,D,D,C,B,D,A,C,C
NA0000027,B,A,D,D,,B,,A,C,B
N00000035,B,A,C,D,B,B,,A,C,

Yukarıda verilen girdi dosyası (input.txt) değerlendirilirken;
-	Her doğru cevap için +4 puan
-	Her boş cevap için +0 puan
-	Her yanlış cevap için -1 puan

olacak şekilde tüm öğrenciler puanlanacaktır. Herhangi bir sınıfın maksimum öğrenci sayısı 100 olacaktır. Değerlendirme sırasında bir öğrencinin sınavdan aldığı toplam puanı 0’in altına inerse bu puan 0 olarak kabul edilecektir. Her bir öğrenciye ait sınav puanları bulunduktan sonra alınabilinecek en yüksek not (yukarıdaki 10 sorulu sınav örneği için 40 puan) 100 olacak şekilde, tüm öğrencilerin notları [0,100] aralığına normalize edilecektir. Sonrasında ise tüm öğrencilerin notları en yüksek notan en düşük nota doğru sıralı olacak şekilde ve en son satırda ise sırası ile:

-	En düşük not
-	En yüksek not
-	Ortalama
-	Medyan
-	Açıklık (range)
bilgilerinden oluşan bir çıktı dosyası (output.txt) hazırlanacaktır. 
Yukarıda örnek girdi dosyası olarak verilen, örneğe ait örnek çıktı dosyası aşağıdaki gibi olmalıdır:
N00000023,32
N00000002,31
NA0000027,27
N00000035,22
32,22,28,29,10

Hatırlatma: C++ veya JavaScript dilleri dışında yapılan ödevler değerlendirilmeye alınmayacaktır.

Yeni yılda size ve tüm sevdiklerinize sağlık, mutluluk ve başarılar dileriz 😊
