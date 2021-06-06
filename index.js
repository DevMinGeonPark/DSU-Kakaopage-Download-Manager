const axios = require("axios");
const cheerio = require("cheerio");

const getHtml = async () => {
  try {
    return await axios.get("https://page.kakao.com/search?word=%EC%95%85%EB%85%80"); //%EC%95%85%EB%85%80 -> 디코딩된 상태로 input해야함.
  } catch (error) {
    console.error(error);
  }
};

  getHtml()
    .then(html => {
      let divList = [];
      const $ = cheerio.load(html.data);
      const $webToonList = $("div.searchContents").children("div");

      $webToonList.each(function(i, elem) {
          divList[i] = {
        url: $(this).find('div.css-151xn98 a').attr('href'),
        title: $(this).find('div.css-151xn98 a div.css-10o3hg3 div.css-fe9s02 div.text-ellipsis').text()
      }
      })
      
      console.log(divList)
    })

  // getHtml()
  // .then(html => {
  //   let ulList = [];
  //   const $ = cheerio.load(html.data);
  //   const $bodyList = $("div.headline-list ul").children("li.section02");

  //   $bodyList.each(function(i, elem) {
  //     ulList[i] = {
  //         title: $(this).find('strong.news-tl a').text(),
  //         url: $(this).find('strong.news-tl a').attr('href'),
  //         image_url: $(this).find('p.poto a img').attr('src'),
  //         image_alt: $(this).find('p.poto a img').attr('alt'),
  //         summary: $(this).find('p.lead').text().slice(0, -11),
  //         date: $(this).find('span.p-time').text()
  //     };
  //   });

  //   const data = ulList.filter(n => n.title);
  //   return data;
  // })
  // .then(res => log(res));