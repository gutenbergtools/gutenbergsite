---
layout: default
title: Search | Project Gutenberg
permalink: /ebooks/index.html
---

Search
======
<div class="page_content">
<style type="text/css">
.icon   { background-image: url(/pics/sprite.png?1591823171);
	  width: 23px;
	height: 23px; }
</style>
<div>
<li class="navlink">
<a class="link" href="/ebooks/search/?sort_order=downloads" accesskey="0">
<span class="cell leftcell without-cover">
<span class="icon-wrapper">
<span class="icon icon_popular"></span>
</span>
</span>
<span class="cell content">
<span class="title">Popular</span>
<span class="subtitle">Our most popular books.</span>
</span>
<span class="hstrut"></span>
</a>
</li>
<li class="navlink">
<a class="link" href="/ebooks/search/?sort_order=release_date" accesskey="1">
<span class="cell leftcell without-cover">
<span class="icon-wrapper">
<span class="icon icon_date"></span>
</span>
</span>
<span class="cell content">
<span class="title">Latest</span>
<span class="subtitle">Our latest releases.</span>
</span>
<span class="hstrut"></span>
</a>
</li>
<li class="navlink">
<a class="link" href="/ebooks/search/?sort_order=random" accesskey="2">
<span class="cell leftcell without-cover">
<span class="icon-wrapper">
<span class="icon icon_random"></span>
</span>
</span>
<span class="cell content">
<span class="title">Random</span>
<span class="subtitle">Random books.</span>
</span>
<span class="hstrut"></span>
</a>
</li>
</div>
<a class="button" href="#popup1">Help</a>	
 <div id="popup1" class="overlay">
  <div class="popup">
   <a class="close" href="#">&times;</a>
    <div class="content">
<p>Enter your search terms separated by spaces, then press &lt;Enter&gt;.
Avoid punctuation except as indicated below:</p>

 <table>
  <tr>
    <th>Suffixes</th>
    <th>.</th>
    <td>exact match</td>
  </tr>
  <tr>
    <th rowspan="7">Prefixes</th>
    <th>a.</th>
    <td>author</td>
  </tr>
  <tr>
    <th>t.</th>
    <td>title</td>
  </tr>
  <tr>
    <th>s.</th>
    <td>subject</td>
  </tr>
  <tr>
    <th>l.</th>
    <td>language</td>
  </tr>
  <tr>
    <th>#</th>
    <td>ebook no.</td>
  </tr>
  <tr>
    <th>n.</th>
    <td>ebook no.</td>
  </tr>
  <tr>
    <th>cat.</th>
    <td>category</td>
  </tr>
<tr>
    <th rowspan="3" style="width: 8em">
      Operators
      <small>Always put spaces around these.</small>
    </th>
    <th>|</th>
    <td>or</td>
  </tr>
  <tr>
    <th>!</th>
    <td>not</td>
  </tr>
  <tr>
    <th>( )</th>
    <td>grouping</td>
  </tr>
</table>

 <table>
  <tr>
    <th>this query</th>
    <th>finds</th>
  </tr>
  <tr>
    <td>shakespeare hamlet</td>
    <td>"Hamlet" by Shakespeare</td>
  </tr>
  <tr>
    <td>qui.</td>
    <td>"qui", not "Quixote"</td>
  </tr>
  <tr>
    <td>love stories</td>
    <td>love stories</td>
  </tr>
  <tr>
    <td>a.shakespeare</td>
    <td>by Shakespeare</td>
  </tr>
  <tr>
    <td>s.shakespeare</td>
    <td>about Shakespeare</td>
  </tr>
<tr>
    <td>#74</td>
    <td>ebook no. 74</td>
  </tr>
  <tr>
    <td>juvenile l.german</td>
    <td>juvenile lit in German</td>
  </tr>
  <tr>
    <td>verne ( l.fr | l.it )</td>
    <td>by Verne in French or Italian</td>
  </tr>
  <tr>
    <td>love stories ! austen</td>
    <td>love stories not by Austen</td>
  </tr>
  <tr>
    <td>jane austen cat.audio</td>
    <td>audio books by Jane Austen</td>
  </tr>
 </table>
  </div>
 </div>
</div>

<div class="searchbox">
 <form method="get" action="/ebooks/search/"
       accept-charset="utf-8" enctype="multipart/form-data">
  <div class="search">
   <p><label for="book-search" class="lbl-toggle">Quick Search</label>
      <input type="text" value="" id="book-search" name="query" class="searchInput" title="" tabindex="20" size="20" maxlength="80"
             placeholder="Quick search"/>
        <input type="submit" id="quicksubmit" name="submit_search" value="Search">
   </p>
  </div>
 </form>
</div>

<div id="popup2" class="overlay">
 <div class="popup">
   <a class="close" href="#">&times;</a>
    <div class="content">
     <ul>
      <li>Advanced Search is case insensitive.</li>
      <li>Fill in as many fields you like.</li>
      <li>Enter one or more space separated words in each field.
	Avoid punctuation characters.</li>
      <li>The result will match all of the words you entered in all
	of the fields. Eg. Author: <i>Jules Verne</i>, Title: <i>20</i>,
	Language: <i>French</i> will get <i>20.000 Leagues Under The Sea</i>
	in French.</li>
      <li>Select Language: <i>English</i> only if you explicitly want to
	exclude works in languages other than English.
	Eg. Author: <i>Molière</i> Language: <i>English</i>
	will get all the works of Molière translated into English.</li>
    </ul>
   </div>
 </div>
</div>

<div id="popup3" class="overlay">
  <div class="popup">
   <a class="close" href="#">&times;</a>
    <div class="content">
        <p>These search engines are not operated by Project Gutenberg, and have their own privacy policies. Your search will be redirected to the named third-party site.</p>
    </div>
  </div>
</div>

<div id="popup4" class="overlay">
 <div class="popup">
  <a class="close" href="#">&times;</a>
   <div class="content">
      <p>These are different ways to browse through the collection.</p>
   </div>
 </div>
</div>

<div id="popup5" class="overlay">
 <div class="popup">
   <a class="close" href="#">&times;</a>
    <div class="content">
    </div>
  </div>
</div>

<div class="box">
 <a class="button" href="#popup2">Help</a>
 <!-- Advanced search form begins here -->
  <form method="post" action="results" accept-charset="utf-8" enctype="multipart/form-data">
   <input id="collapsible1" class="toggle" type="checkbox">
   <label for="collapsible1" class="lbl-toggle">Advanced Search</label>
    <div class="collapsible-content">
     <div class="content-inner">
      <p>
       <label for="author">Author:</label>
       <input type="text" name="author" id="author"/>
      </p>
      <p>
       <label for="title">Title:</label>
       <input type="text" name="title" id="title"/>
      </p>
      <p>
       <label for="subject">Subject:</label>
       <input type="text" name="subject" id="subject"/>
      </p>
      <p>
<!--       <label for="language">Language:</label> -->
       <label>Language:</label>
       <select id="lang" name="lang"
               title="Language (Book Count)">
      <option selected value="">Any</option>
      <option value="af">Afrikaans</option>
      <option value="ale">Aleut</option>
      <option value="ar">Arabic</option>
      <option value="arp">Arapaho</option>
      <option value="brx">Bodo</option>
      <option value="br">Breton</option>
      <option value="bg">Bulgarian</option>
      <option value="rmr">Caló</option>
      <option value="ca">Catalan</option>
      <option value="ceb">Cebuano</option>
      <option value="zh">Chinese</option>
      <option value="cs">Czech</option>
      <option value="da">Danish</option>
      <option value="nl">Dutch</option>
      <option value="en">English</option>
      <option value="eo">Esperanto</option>
      <option value="et">Estonian</option>
      <option value="fa">Farsi</option>
      <option value="fi">Finnish</option>
      <option value="fr">French</option>
      <option value="fy">Frisian</option>
      <option value="fur">Friulian</option>
      <option value="gla">Gaelic, Scottish</option>
      <option value="gl">Galician</option>
      <option value="kld">Gamilaraay</option>
      <option value="de">German</option>
      <option value="el">Greek</option>
      <option value="grc">Greek, Ancient</option>
      <option value="he">Hebrew</option>
      <option value="hu">Hungarian</option>
      <option value="is">Icelandic</option>
      <option value="ilo">Iloko</option>
      <option value="ia">Interlingua</option>
      <option value="iu">Inuktitut</option>
      <option value="ga">Irish</option>
      <option value="it">Italian</option>
      <option value="ja">Japanese</option>
      <option value="csb">Kashubian</option>
      <option value="kha">Khasi</option>
      <option value="ko">Korean</option>
      <option value="la">Latin</option>
      <option value="lt">Lithuanian</option>
      <option value="mi">Maori</option>
      <option value="myn">Mayan Languages</option>
      <option value="enm">Middle English</option>
      <option value="nah">Nahuatl</option>
      <option value="nap">Napoletano-Calabrese</option>
      <option value="nav">Navajo</option>
      <option value="nai">North American Indian</option>
      <option value="no">Norwegian</option>
      <option value="oc">Occitan</option>
      <option value="oji">Ojibwa</option>
      <option value="ang">Old English</option>
      <option value="pl">Polish</option>
      <option value="pt">Portuguese</option>
      <option value="ro">Romanian</option>
      <option value="ru">Russian</option>
      <option value="sa">Sanskrit</option>
      <option value="sr">Serbian</option>
      <option value="sl">Slovenian</option>
      <option value="es">Spanish</option>
      <option value="sv">Swedish</option>
      <option value="bgs">Tagabawa</option>
      <option value="tl">Tagalog</option>
      <option value="te">Telugu</option>
      <option value="cy">Welsh</option>
      <option value="yi">Yiddish</option>
</select>
      </p>
      <p>
       <label for="category" accesskey="c">Category:</label>
       <select id="category" name="category"
               title="Category (Book Count)">
      <option selected value="">Any</option>
      <option value="1">Audio Book, human-read</option>
      <option value="2">Audio Book, computer-generated</option>
      <option value="3">Music, recorded</option>
      <option value="4">Music, Sheet</option>
      <option value="5">Pictures, still</option>
      <option value="6">Other recordings</option>
      <option value="7">Pictures, moving</option>
      <option value="8">Data</option>
      <option value="9">Compilations</option>
       </select>
      </p>
      <p>
       <label for="locc" accesskey="o">LoCC:</label>
       <select id="locc" name="locc"
               title="Please choose a Library of Congress Class.">
      <option selected value="">Any</option>
      <option value="AC">AC General Works: Collections, Series, Collected works, Pamphlets</option>
      <option value="AE">AE General Works: Encyclopedias</option>
      <option value="AG">AG General Works: Dictionaries and other general reference books</option>
      <option value="AM">AM General Works: Museums, Collectors and collecting</option>
      <option value="AP">AP General Works: Periodicals</option>
      <option value="AS">AS General Works: Academies and International Associations, Congresses</option>
      <option value="AY">AY General Works: Yearbooks, Almanacs, Directories</option>
      <option value="AZ">AZ General Works: History of scholarship and learning, The humanities</option>
      <option value="B">B Philosophy, Psychology, Religion</option>
      <option value="BC">BC Philosophy, Psychology, Religion: Logic</option>
      <option value="BD">BD Philosophy, Psychology, Religion: Speculative Philosophy, General Philosophical works</option>
      <option value="BF">BF Philosophy, Psychology, Religion: Psychology, Philosophy, Psychoanalysis</option>
      <option value="BH">BH Philosophy, Psychology, Religion: Aesthetics</option>
      <option value="BJ">BJ Philosophy, Psychology, Religion: Ethics, Social usages, Etiquette, Religion</option>
      <option value="BL">BL Philosophy, Psychology, Religion: Religion: General, Miscellaneous and Atheism</option>
      <option value="BM">BM Philosophy, Psychology, Religion: Judaism</option>
      <option value="BP">BP Philosophy, Psychology, Religion: Islam, Bahaism, Theosophy, Other and new beliefs</option>
      <option value="BQ">BQ Philosophy, Psychology, Religion: Buddhism</option>
      <option value="BR">BR Philosophy, Psychology, Religion: Christianity</option>
      <option value="BS">BS Philosophy, Psychology, Religion: Christianity: The Bible, Old and New Testament</option>
      <option value="BT">BT Philosophy, Psychology, Religion: Christianity: Doctrinal theology, God, Christology</option>
      <option value="BV">BV Philosophy, Psychology, Religion: Christianity: Practical theology, Worship</option>
      <option value="BX">BX Philosophy, Psychology, Religion: Christianity: Churches, Church movements</option>
      <option value="CB">CB History: History of civilization</option>
      <option value="CC">CC History: Archaeology</option>
      <option value="CE">CE History: Technical Chronology, Calendar</option>
      <option value="CJ">CJ History: Numismatics</option>
      <option value="CN">CN History: Inscriptions, Epigraphy</option>
      <option value="CR">CR History: Heraldry</option>
      <option value="CS">CS History: Genealogy</option>
      <option value="CT">CT History: Biography</option>
      <option value="D">D History: General and Eastern Hemisphere</option>
      <option value="D501">D501 History: General and Eastern Hemisphere: World War I</option>
      <option value="D731">D731 History: General and Eastern Hemisphere: World War II</option>
      <option value="DA">DA History: General and Eastern Hemisphere: Great Britain, Ireland, Central Europe</option>
      <option value="DB">DB History: General and Eastern Hemisphere: Austria, Hungary, Czech Republic, Slovakia</option>
      <option value="DC">DC History: General and Eastern Hemisphere: France, Andorra, Monaco</option>
      <option value="DD">DD History: General and Eastern Hemisphere: Germany</option>
      <option value="DE">DE History: General and Eastern Hemisphere: The Mediterranean Region, The Greco-Roman World</option>
      <option value="DF">DF History: General and Eastern Hemisphere: Greece</option>
      <option value="DG">DG History: General and Eastern Hemisphere: Italy, Vatican City, Malta</option>
      <option value="DH">DH History: General and Eastern Hemisphere: Netherlands, Belgium, Luxemburg</option>
      <option value="DJ">DJ History: General and Eastern Hemisphere: Netherlands</option>
      <option value="DJK">DJK History: General and Eastern Hemisphere: Eastern Europe</option>
      <option value="DK">DK History: General and Eastern Hemisphere: Russia, Former Soviet Republics, Poland</option>
      <option value="DL">DL History: General and Eastern Hemisphere: Northern Europe, Scandinavia</option>
      <option value="DP">DP History: General and Eastern Hemisphere: Spain, Portugal</option>
      <option value="DQ">DQ History: General and Eastern Hemisphere: Switzerland</option>
      <option value="DR">DR History: General and Eastern Hemisphere: Balkan Peninsula, Turkey</option>
      <option value="DS">DS History: General and Eastern Hemisphere: Asia</option>
      <option value="DT">DT History: General and Eastern Hemisphere: Africa</option>
      <option value="DU">DU History: General and Eastern Hemisphere: History of Oceania (South Seas)</option>
      <option value="DX">DX History: General and Eastern Hemisphere: History of Romanies</option>
      <option value="E011">E011 History: America: America</option>
      <option value="E151">E151 History: America: United States</option>
      <option value="E186">E186 History: America: Colonial History</option>
      <option value="E201">E201 History: America: Revolution</option>
      <option value="E300">E300 History: America: Revolution to the Civil War</option>
      <option value="E456">E456 History: America: Civil War period</option>
      <option value="E660">E660 History: America: Late nineteenth century</option>
      <option value="E740">E740 History: America: Twentieth century</option>
      <option value="E838">E838 History: America: Later twentieth century</option>
      <option value="E895">E895 History: America: Twenty-first century</option>
      <option value="F001">F001 United States local history: New England</option>
      <option value="F1001">F1001 North America local history: Canada</option>
      <option value="F106">F106 United States local history: Atlantic coast. Middle Atlantic States</option>
      <option value="F1201">F1201 North America local history: Mexico</option>
      <option value="F1401">F1401 Latin America local history: General</option>
      <option value="F1461">F1461 Latin America local history: Guatemala</option>
      <option value="F1481">F1481 Latin America local history: El Salvador</option>
      <option value="F1501">F1501 Latin America local history: Honduras</option>
      <option value="F1521">F1521 Latin America local history: Nicaragua</option>
      <option value="F1541">F1541 Latin America local history: Costa Rica</option>
      <option value="F1561">F1561 Latin America local history: Panama</option>
      <option value="F1601">F1601 History of the Americas: West Indies</option>
      <option value="F1751">F1751 History of the Americas: West Indies. Cuba</option>
      <option value="F1861">F1861 History of the Americas: West Indies. Jamaica</option>
      <option value="F1900">F1900 West Indies local history: Hispaniola (Haiti and Dominican Republic)</option>
      <option value="F1951">F1951 West Indies local history: Puerto Rico</option>
      <option value="F2001">F2001 History of the Americas: Lesser Antilles</option>
      <option value="F206">F206 United States local history: The South. South Atlantic States</option>
      <option value="F2131">F2131 History of the Americas: West Indies. British West Indies</option>
      <option value="F2155">F2155 History of the Americas: Caribbean area. Caribbean sea</option>
      <option value="F2201">F2201 Latin America local history: South America. General</option>
      <option value="F2251">F2251 Latin America local history: Colombia</option>
      <option value="F2301">F2301 Latin America local history: Venezuela</option>
      <option value="F2351">F2351 Latin America local history: Guiana</option>
      <option value="F2501">F2501 Latin America local history: Brazil</option>
      <option value="F2661">F2661 Latin America local history: Paraguay</option>
      <option value="F2701">F2701 Latin America local history: Uruguay</option>
      <option value="F2801">F2801 Latin America local history: Argentina</option>
      <option value="F296">F296 United States local history: Gulf States. West Florida</option>
      <option value="F3051">F3051 Latin America local history: Chile</option>
      <option value="F3301">F3301 Latin America local history: Bolivia</option>
      <option value="F3401">F3401 Latin America local history: Peru</option>
      <option value="F350.5">F350.5 United States local history: Mississippi River and Valley. Middle West</option>
      <option value="F3701">F3701 Latin America local history: Ecuador</option>
      <option value="F396">F396 United States local history: Old Southwest. Lower Mississippi Valley</option>
      <option value="F476">F476 United States local history: Old Northwest. Northwest Territory</option>
      <option value="F516">F516 United States local history: Ohio River and Valley.</option>
      <option value="F590.3">F590.3 United States local history: The West. Trans-Mississippi Region. Great Plains</option>
      <option value="F721">F721 United States local history: Rocky Mountains. Yellowstone National Park</option>
      <option value="F786">F786 United States local history: New Southwest. Colorado River, Canyon, and Valley</option>
      <option value="F850.5">F850.5 United States local history: Pacific States</option>
      <option value="F975">F975 United States local history: Central American, West Indian, and other countries protected by and having close political affiliations with the United States</option>
      <option value="G">G Geography, Anthropology, Recreation</option>
      <option value="GA">GA Geography, Anthropology, Recreation: Mathematical geography, Cartography</option>
      <option value="GB">GB Geography, Anthropology, Recreation: Physical geography</option>
      <option value="GC">GC Geography, Anthropology, Recreation: Oceanography</option>
      <option value="GF">GF Geography, Anthropology, Recreation: Human ecology, Anthropogeography</option>
      <option value="GN">GN Geography, Anthropology, Recreation: Anthropology</option>
      <option value="GR">GR Geography, Anthropology, Recreation: Folklore</option>
      <option value="GT">GT Geography, Anthropology, Recreation: Manners and customs</option>
      <option value="GV">GV Geography, Anthropology, Recreation: Recreation, Leisure</option>
      <option value="H">H Social sciences</option>
      <option value="HA">HA Social sciences: Statistics</option>
      <option value="HB">HB Social sciences: Economic theory, Demography</option>
      <option value="HC">HC Social sciences: Economic history and conditions, Special topics</option>
      <option value="HD">HD Social sciences: Economic history and conditions, Production</option>
      <option value="HE">HE Social sciences: Transportation and communications</option>
      <option value="HF">HF Social sciences: Commerce</option>
      <option value="HG">HG Social sciences: Finance</option>
      <option value="HJ">HJ Social sciences: Public finance</option>
      <option value="HM">HM Social sciences: Sociology</option>
      <option value="HN">HN Social sciences: Social history and conditions, Social problems</option>
      <option value="HQ">HQ Social sciences: The family, Marriage, Sex and Gender</option>
      <option value="HS">HS Social sciences: Societies: secret, benevolent, etc.</option>
      <option value="HT">HT Social sciences: Communities, Classes, Races</option>
      <option value="HV">HV Social sciences: Social pathology, Social and Public Welfare</option>
      <option value="HX">HX Social sciences: Socialism, Communism, Anarchism</option>
      <option value="J">J Political science</option>
      <option value="JA">JA Political science: Political science</option>
      <option value="JC">JC Political science: Political theory</option>
      <option value="JF">JF Political science: Political institutions and public administration</option>
      <option value="JK">JK Political science: Political inst. and pub. Admin.: United States</option>
      <option value="JL">JL Political science: Political inst. and pub. Admin.: America</option>
      <option value="JN">JN Political science: Political inst. and pub. Admin.: Europe</option>
      <option value="JQ">JQ Political science: Political inst. and pub. Admin.: Asia, Africa and Oceania</option>
      <option value="JS">JS Political science: Local government, Municipal government</option>
      <option value="JV">JV Political science: Colonies and colonization, International migration</option>
      <option value="JX">JX Political science: International law</option>
      <option value="JZ">JZ Political science: International relations</option>
      <option value="K">K Law in general, Comparative and uniform law, Jurisprudence</option>
      <option value="KBM">KBM Law in general, Comparative and uniform law, Jurisprudence: Jewish law</option>
      <option value="KBR">KBR Law in general, Comparative and uniform law, Jurisprudence: History of canon law</option>
      <option value="KD">KD Law in general, Comparative and uniform law, Jurisprudence: United Kingdom and Ireland</option>
      <option value="KDZ">KDZ Law in general, Comparative and uniform law, Jurisprudence: America, North America</option>
      <option value="KE">KE Law in general, Comparative and uniform law, Jurisprudence: Canada</option>
      <option value="KF">KF Law in general, Comparative and uniform law, Jurisprudence: United States</option>
      <option value="KH">KH Law in general, Comparative and uniform law, Jurisprudence: South America</option>
      <option value="KJ">KJ Law in general, Comparative and uniform law, Jurisprudence: Europe</option>
      <option value="KL">KL Law in general, Comparative and uniform law, Jurisprudence: Asia and Eurasia, Africa, Pacific Area, and Antarctica</option>
      <option value="KN">KN Law in general, Comparative and uniform law, Jurisprudence: South Asia, Southeast Asia, East Asia</option>
      <option value="KNX">KNX Law in general, Comparative and uniform law, Jurisprudence: Japan</option>
      <option value="KP">KP Law in general, Comparative and uniform law, Jurisprudence: South Asia, Southeast Asia, East Asia</option>
      <option value="KZ">KZ Law in general, Comparative and uniform law, Jurisprudence: Law of nations</option>
      <option value="L">L Education</option>
      <option value="LA">LA Education: History of education</option>
      <option value="LB">LB Education: Theory and practice of education</option>
      <option value="LC">LC Education: Special aspects of education</option>
      <option value="LD">LD Education: Individual institutions: United States</option>
      <option value="LE">LE Education: Individual institutions: America (except US)</option>
      <option value="LF">LF Education: Individual institutions: Europe</option>
      <option value="LH">LH Education: College and school magazines and papers</option>
      <option value="LT">LT Education: Textbooks</option>
      <option value="M">M Music</option>
      <option value="ML">ML Music: Literature of music</option>
      <option value="MT">MT Music: Musical instruction and study, Composition</option>
      <option value="N">N Fine Arts</option>
      <option value="NA">NA Fine Arts: Architecture</option>
      <option value="NB">NB Fine Arts: Sculpture</option>
      <option value="NC">NC Fine Arts: Drawing, Design, Illustration</option>
      <option value="ND">ND Fine Arts: Painting</option>
      <option value="NE">NE Fine Arts: Print media</option>
      <option value="NK">NK Fine Arts: Decorative and Applied Arts, Decoration and Ornament</option>
      <option value="NX">NX Fine Arts: Arts in general</option>
      <option value="P">P Language and Literatures</option>
      <option value="PA">PA Language and Literatures: Classical Languages and Literature</option>
      <option value="PB">PB Language and Literatures: General works</option>
      <option value="PC">PC Language and Literatures: Romance languages: Italian, French, Spanish, Portuguese</option>
      <option value="PD">PD Language and Literatures: Germanic and Scandinavian languages</option>
      <option value="PE">PE Language and Literatures: English</option>
      <option value="PF">PF Language and Literatures: West Germanic</option>
      <option value="PG">PG Language and Literatures: Slavic (including Russian), Languages and Literature</option>
      <option value="PH">PH Language and Literatures: Finno-Ugrian and Basque languages and literatures</option>
      <option value="PJ">PJ Language and Literatures: Oriental languages and literatures</option>
      <option value="PK">PK Language and Literatures: Indo-Iranian literatures</option>
      <option value="PL">PL Language and Literatures: Languages and literatures of Eastern Asia, Africa, Oceania</option>
      <option value="PM">PM Language and Literatures: Indigenous American and Artificial Languages</option>
      <option value="PN">PN Language and Literatures: Literature: General, Criticism, Collections</option>
      <option value="PQ">PQ Language and Literatures: Romance literatures: French, Italian, Spanish, Portuguese</option>
      <option value="PR">PR Language and Literatures: English literature</option>
      <option value="PS">PS Language and Literatures: American and Canadian literature</option>
      <option value="PT">PT Language and Literatures: Germanic, Scandinavian, and Icelandic literatures</option>
      <option value="PZ">PZ Language and Literatures: Juvenile belles lettres</option>
      <option value="Q">Q Science</option>
      <option value="QA">QA Science: Mathematics</option>
      <option value="QB">QB Science: Astronomy</option>
      <option value="QC">QC Science: Physics</option>
      <option value="QD">QD Science: Chemistry</option>
      <option value="QE">QE Science: Geology</option>
      <option value="QH">QH Science: Natural history</option>
      <option value="QH301">QH301 Science: Biology</option>
      <option value="QK">QK Science: Botany</option>
      <option value="QL">QL Science: Zoology</option>
      <option value="QM">QM Science: Human anatomy</option>
      <option value="QP">QP Science: Physiology</option>
      <option value="QR">QR Science: Microbiology</option>
      <option value="R">R Medicine</option>
      <option value="RA">RA Medicine: Public aspects of medicine</option>
      <option value="RB">RB Medicine: Pathology</option>
      <option value="RC">RC Medicine: Internal medicine</option>
      <option value="RD">RD Medicine: Surgery</option>
      <option value="RE">RE Medicine: Ophthalmology</option>
      <option value="RF">RF Medicine: Otorhinolaryngology</option>
      <option value="RG">RG Medicine: Gynecology and obstetrics</option>
      <option value="RJ">RJ Medicine: Pediatrics</option>
      <option value="RK">RK Medicine: Dentistry</option>
      <option value="RL">RL Medicine: Dermatology</option>
      <option value="RM">RM Medicine: Therapeutics, Pharmacology</option>
      <option value="RS">RS Medicine: Pharmacy and materia medica</option>
      <option value="RT">RT Medicine: Nursing</option>
      <option value="RV">RV Medicine: Botanic, Thomsonian, and eclectic medicine</option>
      <option value="RX">RX Medicine: Homeopathy</option>
      <option value="RZ">RZ Medicine: Other systems of medicine</option>
      <option value="S">S Agriculture</option>
      <option value="SB">SB Agriculture: Plant culture</option>
      <option value="SD">SD Agriculture: Forestry</option>
      <option value="SF">SF Agriculture: Animal culture</option>
      <option value="SH">SH Agriculture: Aquaculture, Fisheries, Angling</option>
      <option value="SK">SK Agriculture: Hunting sports</option>
      <option value="T">T Technology</option>
      <option value="TA">TA Technology: Engineering and Civil engineering</option>
      <option value="TC">TC Technology: Ocean engineering</option>
      <option value="TD">TD Technology: Environmental technology, Sanitary engineering</option>
      <option value="TE">TE Technology: Highway engineering, Roads and pavements</option>
      <option value="TF">TF Technology: Railroad engineering and operation</option>
      <option value="TG">TG Technology: Bridge engineering</option>
      <option value="TH">TH Technology: Building construction</option>
      <option value="TJ">TJ Technology: Mechanical engineering and machinery</option>
      <option value="TK">TK Technology: Electrical, Electronics and Nuclear engineering</option>
      <option value="TL">TL Technology: Motor vehicles, Aeronautics, Astronautics</option>
      <option value="TN">TN Technology: Mining engineering, Metallurgy</option>
      <option value="TP">TP Technology: Chemical technology</option>
      <option value="TR">TR Technology: Photography</option>
      <option value="TS">TS Technology: Manufactures</option>
      <option value="TT">TT Technology: Handicrafts, Arts and crafts</option>
      <option value="TX">TX Technology: Home economics</option>
      <option value="U">U Military science</option>
      <option value="UA">UA Military science: Armies: Organization, distribution, military situation</option>
      <option value="UB">UB Military science: Military administration</option>
      <option value="UC">UC Military science: Maintenance and transportation</option>
      <option value="UD">UD Military science: Infantry</option>
      <option value="UE">UE Military science: Cavalry, Armor</option>
      <option value="UF">UF Military science: Artillery</option>
      <option value="UG">UG Military science: Military engineering</option>
      <option value="UH">UH Military science: Other services</option>
      <option value="V">V Naval science</option>
      <option value="VA">VA Naval science: Navies: Organization, distribution, naval situation</option>
      <option value="VB">VB Naval science: Naval administration</option>
      <option value="VE">VE Naval science: Marines</option>
      <option value="VF">VF Naval science: Naval ordnance</option>
      <option value="VG">VG Naval science: Minor services of navies</option>
      <option value="VK">VK Naval science: Navigation, Merchant marine</option>
      <option value="VM">VM Naval science: Naval architecture, Shipbuilding, Marine engineering</option>
      <option value="Z">Z Bibliography, Library science</option>
       </select>
      </p>
      <p>
       <label for="filetype" accesskey="f">Filetype:</label>
       <select id="filetype" name="filetype"
               title="Please choose a file type.">
	       <option selected value="">Any</option>
      <option value="readme">Readme (readme)</option>
      <option value="license">License (license)</option>
      <option value="index">Audio Book Index (index)</option>
      <option value="html">HTML (html)</option>
      <option value="html.gen">Generated HTML (html.gen)</option>
      <option value="html.noimages">Generated HTML (no images) (html.noimages)</option>
      <option value="html.images">Generated HTML (with images) (html.images)</option>
      <option value="iso">ISO CD/DVD Image (iso)</option>
      <option value="epub.dp">EPUB (hand-crafted) (epub.dp)</option>
      <option value="epub.noimages">EPUB (no images) (epub.noimages)</option>
      <option value="epub.images">EPUB (with images) (epub.images)</option>
      <option value="pdf.gen">Generated PDF (pdf.gen)</option>
      <option value="pdf.noimages">Generated PDF (no images) (pdf.noimages)</option>
      <option value="pdf.images">Generated PDF (with images) (pdf.images)</option>
      <option value="kindle.noimages">Kindle (no images) (kindle.noimages)</option>
      <option value="kindle.images">Kindle (with images) (kindle.images)</option>
      <option value="md5">MD5 Checksum (md5)</option>
      <option value="iso.split">Part of ISO CD/DVD Image (iso.split)</option>
      <option value="pdf">PDF (pdf)</option>
      <option value="css">CSS Stylesheet (css)</option>
      <option value="eps">Encapsulated PostScript (eps)</option>
      <option value="mus">Finale (mus)</option>
      <option value="fen">Forsyth–Edwards Notation (fen)</option>
      <option value="gif">GIF Picture (gif)</option>
      <option value="jpg">JPEG Picture (jpg)</option>
      <option value="ly">LilyPond (ly)</option>
      <option value="mid">MIDI (mid)</option>
      <option value="mpg">MPEG Video (mpg)</option>
      <option value="lit">MS Lit for PocketPC (lit)</option>
      <option value="rtf">MS Rich Text Format (rtf)</option>
      <option value="avi">MS Video (avi)</option>
      <option value="wav">MS Wave Audio (wav)</option>
      <option value="doc">MS Word Document (doc)</option>
      <option value="ogg">Ogg Vorbis Audio (ogg)</option>
      <option value="pdb">Palm Database (pdb)</option>
      <option value="prc">Palm Database (prc)</option>
      <option value="plucker">Plucker (plucker)</option>
      <option value="png">PNG Picture (png)</option>
      <option value="ps">PostScript (ps)</option>
      <option value="ps2">PostScript Level 2 (ps2)</option>
      <option value="qioo">QiOO Mobile (qioo)</option>
      <option value="mov">Quicktime Video (mov)</option>
      <option value="qt">Quicktime Video (qt)</option>
      <option value="sib">Sibelius (sib)</option>
      <option value="svg">SVG (svg)</option>
      <option value="dvi">TeX Device Independent (dvi)</option>
      <option value="tiff">TIFF Picture (tiff)</option>
      <option value="tr">Tome Raider (tr)</option>
      <option value="xsl">XSLT Stylesheet (xsl)</option>
      <option value="m4b">Apple iTunes Audiobook (m4b)</option>
      <option value="m4a">Apple iTunes Audiobook (m4a)</option>
      <option value="mp4">MPEG 4 Part 14 (mp4)</option>
      <option value="mp3">MP3 Audio (mp3)</option>
      <option value="spx">Speex Audio (spx)</option>
      <option value="txt.utf-8">Plain Text UTF-8 (txt.utf-8)</option>
      <option value="txt">Plain Text (txt)</option>
      <option value="aac">AAC (Advanced Audio Coding) (aac)</option>
      <option value="flv">Flash Video (flv)</option>
      <option value="xls">Microsoft Excel (xls)</option>
      <option value="nfo">Proprietary `Folio' format (nfo)</option>
      <option value="pageimages">Raw Page Images (pageimages)</option>
      <option value="rdf">RDF (rdf)</option>
      <option value="rst.gen">reStructuredText (rst.gen)</option>
      <option value="tei">TEI Text Encoding Initiative (tei)</option>
      <option value="tex">TeX (tex)</option>
      <option value="wma">Windows Media Audio (wma)</option>
      <option value="xml">XML (xml)</option>
      <option value="rst">reStructuredText (rst)</option>
      <option value="cover.medium">Cover Medium (cover.medium)</option>
      <option value="cover.small">Cover Thumbnail (cover.small)</option>
      <option value="rst.master">reStructuredText Master (rst.master)</option>
      <option value="?">Unspecified (?)</option>
       </select>
      </p>
      <p>
        <input type="submit" id="submit"  name="submit_search" value="Search">
      </p>
    </div>
  </div>
  <!-- Advanced search form ends here -->
 </form>
</div>
  <a class="button" href="#popup4">Help</a>
   {%- include navbar.html -%}
  <a class="button" href="#popup3">Help</a>
  <input id="collapsible2" class="toggle" type="checkbox">
  <label for="collapsible2" class="lbl-toggle">Full Text Search</label>
  <div class="collapsible-content">
    <div class="content-inner">
      <form method="get" action="https://search.yahoo.com/search">
      <img src="/pics/yahoologo.png" style="vertical-align:middle;" alt="Yahoo! logo">
      <input type="hidden" name="fr" value="cap-PG">
      <input type="hidden" name="vs" id="ysvs1" value="gutenberg.org">
      <input type="text"   name="p" size="29" placeholder="Search Yahoo!">
      <input type="submit" value="Yahoo! Search">
      </form>
      <form method="get" action="https://www.google.com/search">
        <img src="/pics/google_search.png" style="vertical-align:middle;" alt="Google logo">
        <input type="text" name="q" size="31" maxlength="255" value="" placeholder="Search Google">
        <input type="hidden" name="domains" value="gutenberg.org"/>
        <input type="hidden" name="sitesearch" value="gutenberg.org"/>
        <input type="submit" name="btnG" value="Google Search"/>
      </form>
  <form method="get" id="duck" action="https://duckduckgo.com/">
    <img src="/pics/duck.png" style="vertical-align:middle;" alt="DuckDuckGo logo">
    <input type="hidden" name="sites" value="http://www.gutenberg.org"/>
    <input type="hidden" name="k8" value="#444444"/>
    <input type="hidden" name="k9" value="#D51920"/>
    <input type="hidden" name="kt" value="h"/>
    <input type="text" name="q" maxlength="255" placeholder="Search DuckDuckGo"/>
    <input type="submit" value="DuckDuckGo Search"/>
  </form>
    </div>
  </div>
</div>
