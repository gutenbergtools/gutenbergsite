---
layout: default
title: Search | Project Gutenberg
permalink: /ebooks/index.html
---
<link rel="stylesheet" href="/gutenberg/search_options.css">

<div class="page">
<!-- Three Icons on top -->
<div class="icons-section">
  <ul class="navlinks">
    <li class="navlink">
      <a class="link" href="/ebooks/search/?sort_order=downloads" accesskey="0">
        <span class="cell leftcell without-cover">
          <span class="icon-wrapper">
            <span class="icon icon_popular"></span>
          </span>
        </span>
        <span class="cell content">
          <span class="title">Most Popular</span>
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
          <span class="title">New Releases</span>
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
          <span class="title">Random Suggestions </span>
        </span>
        <span class="hstrut"></span>
      </a>
    </li>
  </ul>
</div>

<!-- The Three Tabs and their Content -->
<div class="menu-and-content">
  <input type="radio" name="ebook-tabs" id="tab-advanced" class="tab-input" checked>
  <input type="radio" name="ebook-tabs" id="tab-fulltext" class="tab-input">
  <input type="radio" name="ebook-tabs" id="tab-categories" class="tab-input">

  <div class="tabs-container">
    <label for="tab-advanced">Advanced Search</label>
    <label for="tab-fulltext">Full Text Search</label>
    <label for="tab-categories">Categories & Catalogs</label>
  </div>

  <!-- Tab 1 - Advanced Search -->
  <div id="advanced-search" class="tabcontent">
    <!-- Modal Trigger and Modal -->
    <input type="checkbox" id="info-toggle" class="info-checkbox">
    <label for="info-toggle" class="info-icon-label" title="More Information">i</label>

    <div class="info-modal-overlay">
      <label for="info-toggle" class="overlay-clickable"></label>
      <div class="info-modal">
        <label for="info-toggle" class="info-modal-close" title="Close">&times;</label>
        <div class="modal-content">
          <h2>Information</h2>
          <p> - Advanced Search is case insensitive. </p>
          <p> - Fill in as many fields you like. </p>
          <p> - Enter one or more space separated words in each field. Avoid punctuation characters. </p>
          <p> - The result will match all of the words you entered in all of the fields. Eg. Author: Jules Verne, Title: 20, Language: French will get 20.000 Leagues Under The Sea in French. </p>
          <p> - Select Language: English only if you explicitly want to exclude works in languages other than English. Eg. Author: Molière Language: English will get all the works of Molière translated into English. </p>
        </div>
      </div>
    </div>

    <!-- Advanced Search Form -->
    <div class="box">
      <form method="post" action="/ebooks/results/" accept-charset="utf-8" enctype="multipart/form-data">
        <h2> Advanced Search </h2>
        <p> You can use any one search option or multiple at the same time. <br> e.g.  Author=Goethe and Language=German searches for works by Goethe in German. </p>
        <div class="form-group">
          <label for="author">Author</label>
          <input type="text" name="author" id="author">
        </div>
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" name="title" id="title">
        </div>
        <div class="form-group">
          <label for="subject">Subject</label>
          <input type="text" name="subject" id="subject">
        </div>
        
        <div class="form-group">
          <label for="locc" accesskey="o">Subject Areas</label>
          <select id="locc" name="locc" title="Please choose a Library of Congress Class.">
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
        </div>

        <div class="form-group">
          <label for="lang">Language</label>
          <select id="lang" name="lang" title="Language (Book Count)">
            <option selected value="">Any</option>
            <option value="af">Afrikaans</option>
            <option value="ale">Aleut</option>
            <option value="ar">Arabic</option>
            <option value="arp">Arapaho</option>
            <option value="brx">Bodo</option>
            <option value="br">Breton</option>
            <option value="bg">Bulgarian</option>
            <option value="rmq">Caló</option>
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
        </div>

        <div class="form-group">
          <label for="category" accesskey="c">Datatype</label>
          <select id="category" name="category" title="Category (Book Count)">
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
        </div>
        
        <div class="form-group">
          <label for="filetype" accesskey="f">Filetype</label>
          <select id="filetype" name="filetype" title="Please choose a file type.">
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
        </div>
        <div class="form-group">
          <input type="submit" id="submit" name="submit_search" value="Search">
        </div>
      </form>
      
      <div class="advanced-search-bottom-link">
        <div>
          <a href="/help/bibliographic_record.html">Download Formats and Bibliographic Record</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Tab 2 - Full Text Search -->
  <div id="full-text-search" class="tabcontent">
    <div class="full-text-search">
      <h2>Full Text Search</h2>
      <p> Use search engines to search through all Gutenberg pages. </p>
      <form method="get" id="duck" action="https://duckduckgo.com/">
        <img src="/pics/duck.png" style="vertical-align:middle;" alt="DuckDuckGo logo">
        <input type="hidden" name="sites" value="http://www.gutenberg.org">
        <input type="hidden" name="k8" value="#444444">
        <input type="hidden" name="k9" value="#D51920">
        <input type="hidden" name="kt" value="h">
        <input type="text" name="q" maxlength="255" placeholder="Use DuckDuckGo">
        <input type="submit" value="Duckduckgo Search">
      </form>
      <form method="get" action="https://www.google.com/search">
        <img src="/pics/google_logo.png" class="google-logo-img" alt="Google logo">
        <input type="text" name="q" size="31" maxlength="255" value="" placeholder="Use Google">
        <input type="hidden" name="domains" value="gutenberg.org">
        <input type="hidden" name="sitesearch" value="gutenberg.org">
        <input type="submit" name="btnG" value="Google Search">
      </form>
    </div>
  </div>

  <!-- Tab 3 - Categories and Catalogs -->
  <div id="card-catalog" class="tabcontent">
    <h2>Categories</h2>
    <div class="pgdbnavbar" style="text-align: center">
      <div>
        <p> Main Categories are the categories you'd expect in a large book store. </p>
        <div>
          <a href="/ebooks/categories">Go to Main Categories</a>
        </div>
      </div>
      <br >
      <div>
        <p> Reading Lists are hand-curated collections about relatively specific topics. </p>
        <div>
          <a href="/ebooks/bookshelf/"> Go to Reading lists </a>
        </div>
      </div>
      <br >
      <br >
      <h2>Catalogs</h2>
      <div>
        <p>Authors Catalog</p>
        <a href="/browse/authors/a">A</a>&nbsp;
        <a href="/browse/authors/b">B</a>&nbsp;
        <a href="/browse/authors/c">C</a>&nbsp;
        <a href="/browse/authors/d">D</a>&nbsp;
        <a href="/browse/authors/e">E</a>&nbsp;
        <a href="/browse/authors/f">F</a>&nbsp;
        <a href="/browse/authors/g">G</a>&nbsp;
        <a href="/browse/authors/h">H</a>&nbsp;
        <a href="/browse/authors/i">I</a>&nbsp;
        <a href="/browse/authors/j">J</a>&nbsp;
        <a href="/browse/authors/k">K</a>&nbsp;
        <a href="/browse/authors/l">L</a>&nbsp;
        <a href="/browse/authors/m">M</a>&nbsp;
        <a href="/browse/authors/n">N</a>&nbsp;
        <a href="/browse/authors/o">O</a>&nbsp;
        <a href="/browse/authors/p">P</a>&nbsp;
        <a href="/browse/authors/q">Q</a>&nbsp;
        <a href="/browse/authors/r">R</a>&nbsp;
        <a href="/browse/authors/s">S</a>&nbsp;
        <a href="/browse/authors/t">T</a>&nbsp;
        <a href="/browse/authors/u">U</a>&nbsp;
        <a href="/browse/authors/v">V</a>&nbsp;
        <a href="/browse/authors/w">W</a>&nbsp;
        <a href="/browse/authors/x">X</a>&nbsp;
        <a href="/browse/authors/y">Y</a>&nbsp;
        <a href="/browse/authors/z">Z</a>&nbsp;
        <a href="/browse/authors/other">other</a>&nbsp;
      </div>
      <br >
      <div>
        <p>Titles Catalog</p>
        <div>
          <a href="/browse/titles/a">A</a>&nbsp;
          <a href="/browse/titles/b">B</a>&nbsp;
          <a href="/browse/titles/c">C</a>&nbsp;
          <a href="/browse/titles/d">D</a>&nbsp;
          <a href="/browse/titles/e">E</a>&nbsp;
          <a href="/browse/titles/f">F</a>&nbsp;
          <a href="/browse/titles/g">G</a>&nbsp;
          <a href="/browse/titles/h">H</a>&nbsp;
          <a href="/browse/titles/i">I</a>&nbsp;
          <a href="/browse/titles/j">J</a>&nbsp;
          <a href="/browse/titles/k">K</a>&nbsp;
          <a href="/browse/titles/l">L</a>&nbsp;
          <a href="/browse/titles/m">M</a>&nbsp;
          <a href="/browse/titles/n">N</a>&nbsp;
          <a href="/browse/titles/o">O</a>&nbsp;
          <a href="/browse/titles/p">P</a>&nbsp;
          <a href="/browse/titles/q">Q</a>&nbsp;
          <a href="/browse/titles/r">R</a>&nbsp;
          <a href="/browse/titles/s">S</a>&nbsp;
          <a href="/browse/titles/t">T</a>&nbsp;
          <a href="/browse/titles/u">U</a>&nbsp;
          <a href="/browse/titles/v">V</a>&nbsp;
          <a href="/browse/titles/w">W</a>&nbsp;
          <a href="/browse/titles/x">X</a>&nbsp;
          <a href="/browse/titles/y">Y</a>&nbsp;
          <a href="/browse/titles/z">Z</a>&nbsp;
          <a href="/browse/titles/other">other</a>&nbsp;
        </div>
      </div>
    </div>
  </div>
</div>
</div>
