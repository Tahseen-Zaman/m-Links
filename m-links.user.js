// ==UserScript==
// @author       yuumari dev
// @copyright    2022+, yuumari dev (https://yuumari.com/)
// @description  the script will allows you to exchange to a next url automatically.
// @grant        none
// @icon         https://yuumari.com/images/icon-userscript-64.png
// @license      MIT; https://opensource.org/licenses/MIT
// @match        *://*/*
// @name         Url Exchanger for Some Specific Ad-Links
// @namespace    https://yuumari.com/
// @run-at       document-start
// @version      1.84
// ==/UserScript==


+function() {
  'use strict';
  const u = new Proxy(new URL(location.href), {
          get: (t, p) => {
            switch (p) {
              case 'check':
                return o => {
                         for (const [k, v] of Object.entries(o)) {
                           if (v instanceof RegExp) {
                             if (!v.test(t[k])) {
                               return false;
                             }
                           } else {
                             if (t[k] !== v) {
                               return false;
                             }
                           }
                         }
                         return true;
                       };
              case 'path':
                return function(s) {
                         return this.check({pathname: s});
                       };
              case 'hashid':
                return t.hash.slice(1);
              case 'params':
                return new Proxy(t.searchParams, {
                         get: (st, sp) => st.has(sp) ? st.get(sp) : null
                       });
              case 'pkeys':
                return [...t.searchParams.keys()];
              case 'pvals':
                return [...t.searchParams.values()];
              default:
                break;
            }
            return p in t ? t[p] : void 0;
          }
        });
  const go = l => {
          location.href = l;
        };
  const click = l => {
          const m = document.createElement('meta');
          m.name = 'referrer';
          m.content = 'origin';
          document.head.appendChild(m);
          const a = document.createElement('a');
          a.href = l;
          a.click();
        };


  switch (u.host) {

    case 'informaxonline.com':
      return u.path('/') && u.params.link && go(`https://go.adslinkfly.online/${u.params.link}`);

    case 'techrfour.com':
    case 'veganal.co':
      return u.path(/^\/go\/([^\/]+)/) && click(`https://push.bdnewsx.com/${RegExp.$1}`);

    case 'ww1.linktrims.com':
      return u.path('/') && u.params.link && go(`https://go.linktrims.com/${u.params.link}`);

    case 'konstantinova.net':
      return u.path(/^\/verify\/([^\/]+)/) && go(`https://coin.mg/${RegExp.$1}`);

    case 'anime.dutchycorp.space':
    case 'movies.dutchycorp.space':
    case 'tech.dutchycorp.space':
      return u.path(/^\/redir[^.]+?\.php$/) && u.params.code && go(`${u.params.code}?verif=0`);

    case 'www.delishwell.com':
    case 'www.artiskini.com':
    case 'cooklike.info':
    case 'zoss.me':
    case 'fixsolved.my.id':
      return u.path('/') && u.params.link && go(`https://link.paid4link.net/${u.params.link}`);

    case 'bantenexis.com':
      return u.path('/') && u.params.link && go(`http://yousm.link/${u.params.link}`);

    case '7apple.net':
      return u.path('/verify/') && u.pkeys[0] && go(`https://illink.net/${u.pkeys[0]}`);

    case 'newsharsh.com':
      if (u.path('/english/') && u.params.postid) {
        go(`https://ser3.crazyblog.in${u.params.postid}`);
      } else if (u.path('/english/verify/') && u.pkeys[0]) {
        go(`https://ser3.crazyblog.in/${u.pkeys[0]}`);
      } else if (u.path('/box-office/verify/') && u.pkeys[0]) {
        go(`https://hr.vikashmewada.com/${u.pkeys[0]}`);
      }
      break;

    case 'crazyblog.in':
      return u.path('/hars/') && u.params.postid && go(`https://ser3.crazyblog.in/${u.params.postid}`);

    case 'videoslyrics.com':
      return u.path('/') && u.params.postid && go(`https://hr.vikashmewada.com/${u.params.postid}`);

    case 'www.gifans.com':
      return u.path(/^\/link\/([^\/]+)/) && go(`https://shortlink.prz.pw/${RegExp.$1}`);

    case 'havantung.com':
    case 'hvtmmo.com':
      return u.path('/verify/') && u.pkeys[0] && click(`https://short1s.com/${u.pkeys[0]}`);

    case 'wpking.in':
      return u.path('/') && u.params.link && go(`https://o.ovlinks.com/${u.params.link}`);

    case 'www.apasih.my.id':
      return u.path('/') && u.params.link && go(`http://go.gets4link.com/${u.params.link}`);

    case 'blogginglass.com':
      if (u.path('/') && u.params.getlink) {
        go(`http://go.linkad.in/${u.params.getlink}`);
      } else if (u.path('/blog/') && u.params.getlink) {
        go(`http://go.vshort.link/${u.params.getlink}`);
      }
      break;

    case 'jiotech.net':
      if (u.path('/') && u.params.getlink) {
        go(`https://go.fire-link.net/${u.params.getlink}`);
      } else if (u.path('/blog/') && u.params.getlink) {
        go(`https://go.cashurl.in/${u.params.getlink}`);
      } else if (u.path('/finance/') && u.params.getlink) {
        go(`https://go.linkad.in/${u.params.getlink}`);
      }
      break;

    case 'clickscoin.com':
      if (u.path(/^\/short\/([^/]+)/)) {
        go(`https://short.clickscoin.com/${RegExp.$1}`);
      } else if (u.path(/^\/shortccsl\/([^/]+)/)) {
        go(`https://ccsl.xyz/${RegExp.$1}`);
      }
      break;

    case 'dogeclick.net':
      if (u.path(/^\/short\/([^/]+)/)) {
        go(`https://short.clickscoin.com/${RegExp.$1}`);
      } else if (u.path(/^\/ccsl\/([^/]+)/)) {
        go(`https://ccsl.xyz/${RegExp.$1}`);
      }
      break;

    case 'watchdoge.xyz':
    case 'dogeclick.net':
      return u.path(/^\/ccsl\/([^/]+)/) && go(`https://ccsl.xyz/${RegExp.$1}`);

    case 'surflink.tech':
    case 'glamgreet.com':
      return u.path('/') && u.params.go && go(`https://go.linkrex.net/${u.params.go}`);

    case 'www.1apple.xyz':
      return u.path('/') && u.params.link && go(`https://link.turkdown.com/${u.params.link}`);

    case 'ledifha.com':
      return u.path('/') && u.params.link && go(`https://process.ledifha.com/${u.params.link}`);

    case 'blog.textpage.xyz':
      return u.path('/') && u.pvals[0] && go(`https://short.url2go.in/${u.pvals[0]}`);

    case 'missionhight.in':
      return u.path('/safe.php') && u.params.link && go(`https://missionhight.in/blog/${u.params.link}`);

    case 'techboyz.xyz':
      return u.path('/verify/') && u.pkeys[0] && click(`https://short2fly.xyz/${u.pkeys[0]}`);

    case 'mcrypto.club':
      return u.path('/') && /^1\/([^\/]+)/.test(u.params.go) && go(`https://coinsparty.com/${RegExp.$1}`);

    case 'digitalnaz.net':
      return u.path('/') && u.params.getlink && go(`https://go.linkfly.io/${u.params.getlink}`);

    case 'www.gifans.com':
      return u.path(/\/link\/([^&\/\?]+)/) && click(`https://shortlink.prz.pw/${RegExp.$1}`);

    case 'siteblog.in':
      return u.path('/') && u.params.link && go(`https://go.droplink.co.in/${u.params.link}`);

    case 'sahityt.com':
      if (u.path('/') && u.params.v2) {
        click(`https://insurance.sahityt.com/${u.params.v2}`);
      } else if (u.path('/verify/') && u.pkeys[0]) {
        click(`https://insurance.sahityt.com/${u.pkeys[0]}`);
      }
      break;

    case 'shothardware.com':
      return u.path('/') && u.pkeys[0] && go(`https://up-urls.com/${u.pkeys[0]}`);

    case 'url.gamerfang.in':
    case 'url.jethosty.com':
      return u.path('/verify/') && u.pkeys[0] && go(`https://go.richlink.me/${u.pkeys[0]}`);

    case 'jrlinks.in':
    case 'earnme.club':
    case 'usanewstoday.club':
      return u.path('/safe2.php') && u.params.link && go(`https://gadgets.usanewstoday.club/${u.params.link}`);

    case 'www.akcartoons.in':
      return u.path('/') && u.params.link && go(`https://back.expertlinks.in/${u.params.link}`);

    case 'ringtoneinsider.in':
      return u.path('/') && u.params.link && go(`http://ads.pdshort.link/${u.params.link}`);

    case 'jemari.net':
      return u.path('/verify/') && u.pkeys[0] && go(`https://skip.jemari.net/${u.pkeys[0]}`);

    case 'theconomy.me':
      return u.path('/blog/') && u.pkeys[0] && go(`https://link.theconomy.me/${u.pkeys[0]}`);

    case 'htlinks.in':
      return u.path('/') && u.params.link && go(`https://1.htlinks.in/${u.params.link}`);

    case 'hosting4lifetime.com':
      return u.path('/blog/verify/') && u.pkeys[0] && click(`https://abcshort.com/${u.pkeys[0]}`);

    case 'medipost.org':
      return u.path('/verify/') && u.pkeys[0] && click(`https://link.medipost.org/${u.pkeys[0]}`);

    case 'rsrlink.in':
      return u.path('/') && u.params.link && go(`https://go.rsrlink.in/${u.params.link}`);

    case 'www.techishant.in':
      return u.path(/^\/(yuidea|verify)\/$/) && u.pkeys[0] && click(`https://www.techishant.in/blog/${u.pkeys[0]}`);

    case 'smallinfo.in':
      return u.path('/') && u.params.link && go(`https://m.techpoints.xyz/${u.params.link}`);

    case 'xmod.in':
      return u.path('/blog/verify/') && u.pkeys[0] && go(`https://technemo.xyz/blog/${u.pkeys[0]}`);

    case 'dogeearn.com':
      if (u.params.go) {
        if (/^\/([^\/]+)/.test(u.params.go)) {
          go(`https://cryptoads.space/${RegExp.$1}`);
        } else if (/^mh\/([^\/]+)/.test(u.params.go)) {
          go(`https://myhealths.icu/${RegExp.$1}`);
        } else if (/^ca\/([^\/]+)/.test(u.params.go)) {
          go(`https://cryptoads.space/${RegExp.$1}`);
        } else if (/^cu\/([^\/]+)/.test(u.params.go)) {
          go(`https://coinsurl.com/${RegExp.$1}`);
        }
      }
      break;

    case 'sl.easysl.click':
      return u.path(/\/step\d\/([^\/]+)/) && go(`https://easysl.click/${RegExp.$1}`);

    case 'mymobilehub.in':
      return u.path('/') && u.params.link && click(`https://modlink.co/${u.params.link}`);

    case 'www.techwhom.com':
      return u.path('/') && u.params.jeton && click(`https://we.techwhom.com/${u.params.jeton}`);

    case 'claimfey.com':
      if (u.path(/^\/(en\/)?$/) && u.params.link) {
        go(`https://link3s.net/${u.params.link}`);
      } else if (u.path('/press/') && u.params.link) {
        go(`https://zuba.link/${u.params.link}`);
      } else if (u.path('/cryptonews/') && u.pkeys[0]) {
        go(`https://zuba.link/${u.pkeys[0]}`);
      }
      break;

    case 'm.newhit.me':
      return u.path('/') && u.params.link && click(`https://link3s.net/${u.params.link}`);

    case 'aprovax.com':
      return u.path('/') && u.pkeys[0] && click(`https://syflink.com/${u.pkeys[0]}`);

    case 'gadgets.techymedies.com':
      return u.path('/') && u.params.token  && click(`https://blog.disheye.com/${u.params.token}`);

    case 'linkwards.co.in':
      return u.path('/verify/') && u.pkeys[0] && go(`https://ads.linkwards.com/${u.pkeys[0]}`);

    case 'vshort.net':
      return u.path('/') && u.params.Link  && go(`https://vshort.in/${u.params.Link}`);

    case 'www.loot4cash.com':
      return u.path('/verify/') && u.pkeys[0] && go(`http://ads.adloot.in/${u.pkeys[0]}`);

    case 'jazbaat.in':
      return u.path('/') && u.params.link && go(`https://go.rplinks.in/${u.params.link}`);

    case 'faucethub.ly':
      return u.path(/\/hs\/+?([^\/]+)/) && go(`https://goads.ly/${RegExp.$1}`);

    case 'blogshangrila.com':
      return u.path('/verify/') && /^(insurance\/)?([^\/]+)/.test(u.pkeys[0]) && go(`http://blogshangrila.com/insurance/${RegExp.$2}`);

    case 'cypherroot.com':
      return u.path('/') && u.params.link && go(`https://blogshangrila.com/insurance/${u.params.link}`);

    case 'teerclub.com':
      return u.path('/verify/') && u.pkeys[0] && go(`https://zenshort.com/${u.pkeys[0]}`);

    case 'www.lootcash.vip':
      return u.path('/verify/') && u.pkeys[0] && go(`https://ads.flyad.vip/${u.pkeys[0]}`);

    case 'thekhatrimaza.in':
      return u.path('/') && u.params.link && go(`https://go.bharaturl.com/${u.params.link}`);

    case 'tecmundo.net':
      return u.path('/verify/') && u.pkeys[0] && click(`http://go.jaelink.us/${u.pkeys[0]}`);

    case 'tech.bloggertheme.xyz':
      return u.path('/') && u.params.token && click(`https://go.bloggertheme.xyz/${u.params.token}`);

    case 'techyclub.in':
      return u.path('/') && u.pkeys[0] && go(`https://web.pdiskplayer.xyz/${u.pkeys[0]}`);

    case 'techdaze.in':
      return u.path('/') && u.pkeys[0] && go(`https://web.mdiskplayer.in/${u.pkeys[0]}`);

    case 'coinsearns.com':
      if (u.path('/btc/') && /^(cu)?\/([^\/]+)$/.test(u.params.go)) {
        go(`https://coinsurl.com/${RegExp.$2}`);
      } else if (u.path(/^\/cp\/ca\/([^\/]+)/)) {
        go(`https://cryptoads.space/${RegExp.$1}`);
      } else if (u.path(/^\/cp\/mh\/([^\/]+)/)) {
        go(`https://myhealths.icu/${RegExp.$1}`);
      } else if (u.path(/^\/cp\/cf\/([^\/]+)/)) {
        go(`https://cryptoflare.cc/${RegExp.$1}`);
      }
      break;

    case 'short.modmakers.xyz':
      return u.path('/') && u.params.link && go(`https://v.earnl.xyz/${u.params.link}`);

    case 'economiarelevante.com.br':
      return u.path('/verify/') && u.pkeys[0] && click(`https://shrinkgold.com/${u.pkeys[0]}`);

    case 'crypto-faucet.xyz':
      if (u.path(/^\/claim\/link\/([^\/]+)/)) {
        go(`https://doctor-groups.com/link/${RegExp.$1}`);
      } else if (u.path(/^\/bitco\/link\/([^\/]+)/)) {
        go(`https://doctor-groups.com/link/${RegExp.$1}`);
      }
      break;

    case 'se.shorten1s.com':
      return u.path('/') && u.params.link && click(`https://shorten1s.com/${u.params.link}`);

    case 'whostingfx.com':
      return u.path('/verify/') && u.pkeys[0] && click(`http://blog.flyrar.com/${u.pkeys[0]}`);

    case 'blog.urlbharat.xyz':
    case 'get.urlbharat.xyz':
      return u.path('/safe.php') && u.params.link && go(`https://video.earnspace.in/${u.params.link}`);

    case 'a.jardima.com':
      return u.path(/\/([^\/]+)/) && go(`https://zirof.com/${RegExp.$1}`);

    case 'm.urlbharat.xyz':
      return u.path('/verify/') && u.pkeys[0] && go(`https://skshort.xyz/${u.pkeys[0]}`);

    case 'examsolution.in':
      return u.path('/verify/') && u.pkeys[0] && click(`https://kukslincs.xyz/${u.pkeys[0]}`);

    case 'www.techak.in':
      return u.path('/') && u.params.go && go(`https://ads.payulink.in/${u.params.go}`);

    case 'foxbugg.com':
      return u.path('/') && u.params.sh && go(`https://ads.foxbugg.com/${u.params.sh}`);

    case 'my.techyblogs.in':
      return u.path('/') && u.params.link && click(`https://m.techpoints.xyz/${u.params.link}`);

    case 'www.filmypoints.in':
      return u.path('/') && u.params.link && click(`https://m.techpoints.xyz/${u.params.link}`);

    case 'finances.ninja':
      return u.path('/') && u.params.link && click(`https://go.shortit.tech/${u.params.link}`);

    case 'rupamobile.in':
      return u.path('/') && u.params.go && click(`https://mdisk.one/${u.params.go}`);

    case 'expressme.in':
      return u.path('/') && u.params.link && go(`https://ads.freelink.in/${u.params.link}`);

    case 'short.helpstudy.in':
      return u.path('/safe.php') && u.params.link && go(`https://master.shortxlinks.com/${u.params.link}`);

    case 'tipsbud.com':
      return u.path('/verify/') && u.pkeys[0] && click(`https://blog.avhop.net/${u.pkeys[0]}`);

    case 'itechlogic.in':
      return u.path('/') && u.params.link && go(`https://go.apurl.in/${u.params.link}`);

    case 'linkshortifyx.link':
      return u.path('/') && u.params.link && go(`https://yo.linkshortify.net/${u.params.link}`);


/* need to stop 30x redirect (use header modifier) */

    case 'www.gkqnaexam.com':
      return u.path(/^\/(yuidea|verify)\/$/) && u.pkeys[0] && click(`https://web.url2link.com/${u.pkeys[0]}`);

    case 'adarima.org':
      if (u.path(/^\/post\/?/) && /^\/?(\d+?)\/([^\/]+)/.test(u.pkeys[0])) {
        if (RegExp.$1 === '1') {
          go(`https://coinsparty.com/${RegExp.$2}`);
        } else if (RegExp.$1 === '2') {
          go(`https://coinsurl.com/${RegExp.$2}`);
        } else if (RegExp.$1 === '3') {
          go(`https://cryptoads.space/${RegExp.$2}`);
        } else if (RegExp.$1 === '4') {
          go(`https://myhealths.icu/${RegExp.$2}`);
        } else if (RegExp.$1 === '5') {
          go(`https://cryptoflare.cc/${RegExp.$2}`);
        }
      }
      break;

    case 'href.faucetpay.click':
      return u.path(/\/([^\/]+)/) && go(`https://freebitcoin.fun/view/${RegExp.$1}`);

    case 'examkhata.com':
      return u.path('/go.php') && u.params.link && click(`https://doodshort.com/${u.params.link}`);

    case 'biharmirchi.co.in':
      return u.path('/go.php') && u.params.link && click(`https://playlink.xyz/${u.params.link}`);

    case 'freefeyorra.com':
      return u.path(/\/short\/([^\/]+)/) && go(`https://earnultimate.space/short/${RegExp.$1}`);

    case 'tcash.link':
      return u.path(/\/([^\/]+)/) && go(`https://cashurl.in/${RegExp.$1}`);

    case 'dot-com.link':
      return u.path(/\/([^\/]+)/) && go(`https://bitcoinly.in/${RegExp.$1}`);

    case 'go.owllink.net':
      return u.path(/\/([^\/]+)/) && go(`https://owllink.net/${RegExp.$1}`);

    case 'go.birdurls.com':
      return u.path(/\/([^\/]+)/) && go(`https://birdurls.com/${RegExp.$1}`);

    case 'ethereumearner4.club':
      return u.path(/\/([^\/]+)/) && go(`https://solanaborobudur.my.id/${RegExp.$1}`);

    case 'shortsfly.bid':
      return u.path(/\/w\/([^\/]+)/) && go(`https://shortsfly.me/${RegExp.$1}`);

    case 'urlsfly.bid':
      return u.path(/\/w\/([^\/]+)/) && go(`https://urlsfly.me/${RegExp.$1}`);

    case 'wefly.bid':
      return u.path(/\/w\/([^\/]+)/) && go(`https://wefly.me/${RegExp.$1}`);

    case 'clicksfly.bid':
      return u.path(/\/w\/([^\/]+)/) && go(`https://clicksfly.me/${RegExp.$1}`);

    case 'upperfly.bid':
      return u.path(/\/w\/([^\/]+)/) && go(`https://upperfly.me/${RegExp.$1}`);

    case 'linksfly.bid':
      return u.path(/\/w\/([^\/]+)/) && go(`https://linksfly.me/${RegExp.$1}`);

    case 'webbfly.bid':
      return u.path(/\/w\/([^\/]+)/) && go(`https://webfly.me/${RegExp.$1}`);

    case 'buzzzfly.bid':
      return u.path(/\/w\/([^\/]+)/) && go(`https://buzzfly.me/${RegExp.$1}`);

    case 'ezzfly.bid':
      return u.path(/\/w\/([^\/]+)/) && go(`https://ezzfly.me/${RegExp.$1}`);

    case 'fishfly.bid':
      return u.path(/\/w\/([^\/]+)/) && go(`https://fishfly.me/${RegExp.$1}`);

    case 'bitcomarket.net':
      return u.path('/') && u.pkeys[0] && go(`https://adshorti.co/${u.pkeys[0].slice(1)}`);

    case '99links.in':
    case '99links.xyz':
      return u.path(/\/([^\/]+)/) && go(`https://go.99links.in/${RegExp.$1}`);

    case 'bloogerspoot.tk':
      return u.path(/\/([^\/]+)/) && go(`https://softindex.website/${RegExp.$1}`);

    case 'toryx2link.com':
      return u.path(/\/([^\/]+)/) && go(`https://toryxlink.com/${RegExp.$1}`);

    case 'blogs.egfly.xyz':
      return u.path(/\/([^\/]+)/) && go(`https://link.egfly.xyz/${RegExp.$1}`);

    case 'rdir.techleets.xyz':
      return u.path(/\/([^\/]+)/) && go(`https://1manga.xyz/view/${RegExp.$1}`);

    case 'techflip.co':
      if (u.path('/') && u.params.dta) {
        return go(`https://techflip.co/${u.params.dta}`);
      } else if (u.path('/') && u.params.link) {
        return go(`https://techflip.co/${u.params.link}`);
      }
      break;

    case 'files.technicalatg.com':
      return u.path(/\/([^\/]+)/) && go(`https://atglinks.com/${RegExp.$1}`);

    case 'link4earn.in':
      return u.path(/\/([^\/]+)/) && go(`https://link4earn.com/${RegExp.$1}`);

    case 'shareduit.pw':
      return u.path(/\/([^\/]+)/) && go(`https://safelinkduit.com/${RegExp.$1}`);

    case 'weezo.me':
      return u.path(/\/([^\/]+)/) && go(`https://big2short.com/${RegExp.$1}`);

    case 'linkrupiah.com':
      return u.path(/\/s\/([^\/]+)/) && go(`https://process.ledifha.com/${RegExp.$1}`);

    case 'modli.ink':
      return u.path(/\/([^\/]+)/) && go(`https://modlink.co/${RegExp.$1}`);

    case 'gdflix.in':
      return u.path(/\/([^\/]+)/) && go(`https://vshort.in/${RegExp.$1}`);

    case 'adnocean.in':
      return u.path('/') && u.params.dta && go(`https://spidertizz.in/tech/${u.params.dta}`);

    case 'earninglover.com':
      return u.path('/go.php') && u.params.link && click(`https://mazalink.com/${u.params.link}`);

    case 'jardima.com':
      return u.path(/\/wp\/([^\/]+)/) && go(`https://zirof.com/${RegExp.$1}`);

    case 'asideway.com':
      return u.path(/\/verifylv\d\//) && u.params.pkeys[0] && click(`https://link1s.com/${u.params.pkeys[0]}`);

    case 'anhdep24.com':
      return u.path('/verifynet/') && u.params.pkeys[0] && click(`https://link1s.net/${u.params.pkeys[0]}`);

    case 'nguyenvanbao.com':
      return u.path('/verify1sh/') && u.params.pkeys[0] && click(`https://1shorten.com/${u.params.pkeys[0]}`);

    case 'filmycover.com':
      return u.path('/') && u.params.link && go(`https://m.techyblogs.in/${u.params.link}`);

    case 'club.btcpany.com':
      return u.path('/go.php') && u.params.dex && click(`https://panyflay.me/${u.params.dex}`);

    case 'pi-l.ink':
    case 'go.poketoonworld.com':
      return u.path(/\/([^\/]+)/) && go(`https://go.pilinks.net/${RegExp.$1}`);

    case 'zed.madshiba.fun':
      return u.path('/key') && u.params.l && click(`https://slfly.me/${u.params.l}`);

    case 'lkse.ga':
      return u.path(/\/([^\/]+)/) && go(`https://linksedge.in/${RegExp.$1}`);


    default:
      break;

  }

}``;
