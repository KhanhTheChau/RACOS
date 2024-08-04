import scrapy

class VNCSpider(scrapy.Spider):
    name = 'vnc1'
    start_urls = ['https://vietnamnet.vn/chinh-tri-page' + str(i) for i in range(1, 401)] + ['https://vietnamnet.vn/kinh-doanh-page' + str(i) for i in range(1, 401)] + ['https://vietnamnet.vn/the-thao-page' + str(i) for i in range(1, 401)] + ['https://vietnamnet.vn/giao-duc-page' + str(i) for i in range(1, 401)] + ['https://vietnamnet.vn/suc-khoe-page' + str(i) for i in range(1, 401)] + ['https://vietnamnet.vn/giai-tri-page' + str(i) for i in range(1, 401)]

    def parse(self, response):
        if response.url.startswith('https://vietnamnet.vn/chinh-tri'):
            category = 'Politics'
        elif response.url.startswith('https://vietnamnet.vn/kinh-doanh'):
            category = 'Business'
        elif response.url.startswith('https://vietnamnet.vn/the-thao'):
            category = 'Sports'
        elif response.url.startswith('https://vietnamnet.vn/giao-duc'):
            category = 'Education'
        elif response.url.startswith('https://vietnamnet.vn/suc-khoe'):
            category = 'Wellness'
        else:
            category = 'Entertainment'

        titles = response.xpath('//div/h3/a/@title').getall()
        links = response.xpath('//div/h3/a/@href').getall()

        for title, link in zip(titles, links):
            yield {'title': title, 'link': link, 'category': category}
