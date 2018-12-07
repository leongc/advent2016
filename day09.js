/*
https://adventofcode.com/2016/day/9
--- Day 9: Explosives in Cyberspace ---
Wandering around a secure area, you come across a datalink port to a new part of the network. After briefly scanning it for interesting files, you find one file in particular that catches your attention. It's compressed with an experimental format, but fortunately, the documentation for the format is nearby.

The format compresses a sequence of characters. Whitespace is ignored. To indicate that some sequence should be repeated, a marker is added to the file, like (10x2). To decompress this marker, take the subsequent 10 characters and repeat them 2 times. Then, continue reading the file after the repeated data. The marker itself is not included in the decompressed output.

If parentheses or other characters appear within the data referenced by a marker, that's okay - treat it like normal data, not a marker, and then resume looking for markers after the decompressed section.

For example:

ADVENT contains no markers and decompresses to itself with no changes, resulting in a decompressed length of 6.
A(1x5)BC repeats only the B a total of 5 times, becoming ABBBBBC for a decompressed length of 7.
(3x3)XYZ becomes XYZXYZXYZ for a decompressed length of 9.
A(2x2)BCD(2x2)EFG doubles the BC and EF, becoming ABCBCDEFEFG for a decompressed length of 11.
(6x1)(1x3)A simply becomes (1x3)A - the (1x3) looks like a marker, but because it's within a data section of another marker, it is not treated any differently from the A that comes after it. It has a decompressed length of 6.
X(8x2)(3x3)ABCY becomes X(3x3)ABC(3x3)ABCY (for a decompressed length of 18), because the decompressed data from the (8x2) marker (the (3x3)ABC) is skipped and not processed further.
What is the decompressed length of the file (your puzzle input)? Don't count whitespace.
*/
function decompress(s) {
  var result = "";
  var state = "NORMAL"; // COUNT, LENGTH, CAPTURE
  var tempStr;
  var length;
  var count;
  
  for (let c of s) {
    if (state == "NORMAL") {
      if (c == "(") {
        state = "LENGTH";
        tempStr = "";
      } else {
        result += c;
      }
    } else if (state == "LENGTH") {
      if (c == "x") {
        length = parseInt(tempStr);
        state = "COUNT";
        tempStr = "";
      } else {
        tempStr += c;
      }
    } else if (state == "COUNT") {
      if (c == ")") {
        count = parseInt(tempStr);
        state = "CAPTURE";
        tempStr = "";
      } else {
        tempStr += c;
      }
    } else if (state == "CAPTURE") {
      tempStr += c;
      if (--length == 0) {
        result += tempStr.repeat(count);
        state = "NORMAL";
      }
    }
  }
  if (state != "NORMAL") {
    console.warn("unexpected end state: " + state + 
      " with '" + tempStr + "' and count=" + count + " and length=" + length);
  }
  return result;
}

console.assert(decompress("ADVENT") == "ADVENT", "contains no markers and decompresses to itself with no changes");
console.assert(decompress("A(1x5)BC") == "ABBBBBC", "repeats only the B a total of 5 times");
console.assert(decompress("(3x3)XYZ") == "XYZXYZXYZ", "for a decompressed length of 9");
console.assert(decompress("A(2x2)BCD(2x2)EFG") == "ABCBCDEFEFG", "doubles the BC and EF");
console.assert(decompress("(6x1)(1x3)A") == "(1x3)A", "the (1x3) looks like a marker, but because it's within a data section of another marker, it is not treated any differently from the A that comes after it.");
console.assert(decompress("X(8x2)(3x3)ABCY") == "X(3x3)ABC(3x3)ABCY");

var input = "(172x1)(3x7)XPJ(70x4)(40x7)WKQANMDILIQOOWQZDNGORPHFNHBKKKVQEJNUVNAQ(3x2)VFV(10x1)XUNNCAFYMV(9x13)OUIKISEPR(66x13)(10x6)JHDDURBDQC(3x11)SNT(2x11)EW(16x6)WMJFKTNQEACIZXLH(5x12)KPVAD(13x8)(8x2)ELNIDSSO(11x7)RFITQIJYVQB(6x5)HTVSFUVZ(89x12)(44x5)(7x1)VHEWGTT(5x11)GLDZO(14x13)DZVEJXGSGUDJKV(24x14)(18x3)AWXPFDVHVRRUAIELQO(2x13)UW(120x7)(62x7)(21x10)JFUYPPCABHPYTIJUUIEVK(5x5)UNAMQ(17x14)TFQKSOALOJYMSMLMK(17x2)NBDXRSHFDREHZPWMM(23x5)(1x11)O(10x6)QVOCIXBIQW(5x10)FOLCQ(6635x5)(3576x2)(456x13)(449x3)(1x2)M(1x11)I(215x14)(28x2)(1x14)R(9x7)OSMSWTRTV(2x3)RP(87x2)(14x9)QACULEYKFWPHFQ(41x15)LTBJBTBTFQLLEAWJTICLZBHGAYERVARMDLCBZXYPY(4x6)CEOP(4x13)JQJI(62x5)(15x6)YQPFVDNREIYOUKL(15x15)PUSBXTHCMLGOCNT(8x4)YAUHTKIM(1x1)E(14x2)(9x1)YHUAWBSED(37x12)(14x9)(8x11)SVYXKPGZ(10x13)WTQVTWIWGP(162x9)(68x1)(1x4)I(21x14)WTBNFSPQKDFYITBOFYYQN(3x8)UOY(13x14)KCDKDKYFQNNPX(1x6)K(20x9)PMGWXQWRLRWRETULVFPW(1x3)T(20x13)(7x7)YYHNWZC(2x10)HH(22x10)XDUOOOIDYYXQKQDBLGCPSR(1297x7)(359x13)(62x9)(7x15)LRERGOG(25x15)KYQSSJBREHLNZXSLSYGIIADSC(10x15)WMFZAHRNRU(283x14)(68x12)(16x10)QGQDCKCPTECIPTOW(19x6)WMPAPTDDUABBOLYMMBR(14x1)XRZVQKCBBBMCNI(29x5)HSGAQWQRLOILWCRJOCRDFZSOTPLBH(82x1)(12x1)RENHWOTHWXPZ(39x10)BIKLBTNHOLVUWVGTPRPXXROUGEJRHRADHASJDMJ(4x13)VRRP(3x1)BFC(79x9)(39x4)OINGYXONKTSXJBCNNYZMWSYGIUMFATXEUDZQZVL(9x13)OIMKIRFAT(5x1)MIUXM(3x13)EPG(496x13)(37x4)(31x9)(2x5)MF(18x2)MEVRXNGVBHEGENHJTL(11x13)TTCEWIFBGGJ(150x4)(68x13)(9x10)KJJRCHTUM(11x10)SVUDYGHJWKF(6x12)LNWLUN(8x11)LUVPHPZC(4x8)VFUZ(32x9)(2x3)RH(5x5)OOAGL(1x15)W(2x11)WM(3x4)GFG(22x13)(8x6)ZVCSHQXP(4x8)KOXS(193x3)(25x7)PXQFECGPYZOYUWTMOTBFZGGAO(28x12)(7x4)XHUHXEN(10x4)DTXYSILNLW(1x2)Q(101x13)(16x11)MZVPYIEPSLDSIEAF(27x11)NFACRSGETEPHFJQKPTXUQNNSPWT(6x13)UADYIT(2x8)LB(19x7)QYBDEBFMFAWOTYACZQM(6x13)YEABPA(72x6)(58x13)(3x15)UOO(43x6)GRXJNNQQXQVANDHYVVQTTWIKVLPHBJMCSEOPBELMGHG(1x10)G(178x10)(12x1)(6x15)JWYUKS(93x13)(5x11)CQCXM(56x7)(9x5)FIARQLQTK(11x3)NSXGBEOBVXI(9x15)QIBUNRTPC(5x8)GBIYV(13x10)(2x6)RC(1x5)T(33x14)(3x4)END(19x6)MYZTTHSNYAYANBPGVHZ(2x14)YD(6x12)(1x5)N(3x13)TFG(224x8)(11x15)XNMAIBBNTMC(199x8)(2x10)VG(23x11)(5x11)KOKXL(7x9)MIMRNXM(121x10)(10x9)OGYRDPVNEI(27x5)XUBNCPGOKJIXZNAHHLLDRUUTPRM(25x2)FVEEUXQTUBDUDSMIRLBFQYULY(13x5)JTJASJBCCKFHV(16x6)TVTTDIFACKNORYBR(4x2)LIFO(17x2)RZGYMXWONVKWJMSVW(833x6)(586x12)(230x10)(2x13)EL(41x15)(34x11)KPHSFJQJWTINMWYVNSVVZBABFYEBZCLNMQ(17x14)CRLPIZUEIBCKNKRJJ(62x15)(9x4)XTGHEGPMK(11x12)NCNNMDWDNMI(8x2)PKWGUNYT(10x15)DVAFJQIPSK(74x10)(5x15)ZLKKA(17x11)GIERLJRIDYLPWZCKG(33x2)OASXACZZRSCLVDVNLNGQHLRLMZCTMBCYP(153x7)(2x14)UX(49x8)(11x14)GEHZYBKESFQ(2x6)TE(6x3)THQOAO(8x6)FSPDZODL(42x11)(2x12)XO(10x7)IZTTYUPKBT(11x13)PVRXUXHBKQI(35x6)(5x5)UDRJC(1x9)B(13x9)YHHERZVEFSCFX(78x11)(36x3)(1x6)X(23x14)DHLGIIMPJGKDUOPFEBPKJZB(7x12)TMWJAJD(16x12)YVALDPNTHINYQQIC(2x9)OY(90x5)(62x10)(9x6)RUUFLMWQS(28x6)TAZAAAIDBGZMYXMNGHVTBRHWFHXV(8x13)JIRKEMEB(15x5)ORKLKISZMYECJBE(178x12)(59x5)(5x9)QLOCV(6x5)XETXIX(11x15)USNLPYJLBOW(13x15)ZYMFNBNVKKQFT(11x3)PISAKCRXTWT(90x7)(52x2)(1x3)F(21x6)QFIQOUEYORICJDZVHMIOW(13x6)ONYWAVOHAIQXE(9x5)TKBIAQVJC(7x5)SUEYTHE(1x4)H(46x13)(33x3)(26x15)(1x3)Q(14x3)OHRVGRUAQFTYYS(2x6)BS(960x3)(544x15)(160x14)(15x2)(1x11)D(3x9)PXR(52x4)(9x13)ZVIVIWOIO(1x5)D(1x12)Y(8x8)CKZGFGQO(6x9)DAMZNP(75x8)(13x1)VDPXRVCMGTZIY(3x13)WMF(10x12)KDJVCJQVEC(24x3)GEKGZEIIDDDJRSZBNAIDNASO(3x15)VUI(74x5)(46x8)(6x2)GSPMZV(4x2)XOOW(9x15)COLWEPZNQ(5x13)UGBDW(15x10)TTWVRPQTREJDSJS(137x14)(65x10)(8x13)OMBDNQBZ(44x13)RVXFBIJOFAQJCLTKYBXVWALEONUACICLGJIWATGHHCZK(22x14)ZSGSVEEFHRWHXBLGCDJKZV(30x2)(2x12)GG(9x12)HJQCPKGNY(1x14)H(134x15)(5x4)YGCHW(5x10)EROTH(26x10)(7x1)OXPTTDP(8x10)OJJSDGCL(74x8)BDTYNXCCPDQCMYZJTAJOYCGMWJLOMLEQYBCYAZOLTCYNDAPXMXCHVSKJCYXZWBKGVELGTLNCEB(54x14)(14x13)(2x9)SM(1x10)U(27x3)XFJSNXIJPTSFDKVNGBDNRLQYJKQ(16x11)(10x9)BAPIHODLEG(317x8)(112x11)(30x4)(6x15)UTROFQ(11x11)UYHDNMPLNBH(28x5)ZMZKTXRTUNMVSQTUGNYDWUOFAFBA(2x4)OT(21x15)(9x3)VRSRVOEDX(1x10)W(1x12)H(86x12)(1x6)Y(25x9)ZYIPXGLABDQQRIQOWYNSVRDDS(35x5)NJIVDKLQTESWZNBIFFPADGWBQGVWPNOZKOB(3x8)JZK(98x8)(45x10)(6x5)LYJQMR(10x7)EFMGJRIYHN(1x12)W(5x11)CXUHP(40x1)(33x14)BIXNELLRAWDEQWDLFXASPCFKGYXNPZRLP(102x3)(35x15)(29x2)(1x1)P(8x2)OGCHVTFM(5x2)CVQRK(54x3)(48x4)(10x3)(5x6)IUXTW(26x7)(7x3)MCAIFSI(9x6)THFFYJGAO(1522x10)(25x12)(18x13)(12x1)(7x4)HVDYPIO(1159x6)(211x8)(154x11)(21x6)VCPDOYQRGXIJVQGRJTVWP(12x10)CEOZLAMGANTR(16x14)HRTTJOTOJYRMGUDK(79x5)(4x11)JHCB(4x15)FHRU(9x12)TVDNDJPQW(2x5)WH(30x14)LUFKTGXZTAORPRJMZESFFDVVWPVYTB(42x14)(35x14)(29x2)SAGPXWQEGTZAIADCQFBLWRLZIQGCN(135x7)(15x14)UQJYCTIFFWSUWWM(65x2)(9x9)(3x12)JUN(18x5)(12x8)RDYSFFHOCMTA(2x7)QY(14x3)(9x7)FERWVDDHQ(36x2)(11x7)ILSHNBRIBMC(13x8)SRXBXAPPTJPLF(101x14)(2x10)VE(86x10)(29x8)(23x8)KAMCCHDVKOOJCGDQJPZZMPJ(32x9)UEYJFLAOACKYLFDJWQUXGIZYWMHDKYLK(8x6)(3x3)LKI(682x13)(208x6)(76x14)(8x10)AYLZDXBI(3x9)BRC(25x10)IEATCRHBHGIKZBQTRCTXULAMN(15x12)ZHRTNMVERVGZZCG(32x3)(4x14)ERHO(7x7)NNNSCSF(5x4)TTUFM(4x7)XYWL(72x4)(3x7)SDF(29x13)OQXOWQELFOXUFEEBUPLNHMAOGLLPV(14x5)SZJGEXPPXSUXCB(3x8)KND(95x1)(28x5)(7x3)LVLVSVN(10x8)TGDBTKXVLI(10x11)WRFPBLNECA(29x1)XFGOLCPIYTKNJTXBAEATURQVVXGFP(3x14)YBZ(205x1)(16x14)(10x8)IFQMAAEMOP(32x9)(16x14)VBFTUPKSNIUAEBHA(3x14)EMW(23x11)(2x7)XS(3x7)QWS(2x12)TE(107x2)(21x12)XKLOCAHJZFYLQZMQDZUJP(28x15)VFRNAEWVNJVUZDURVOCUEISKGWWN(20x6)NXCCPUPQKGXTOWWRANDP(12x9)WRJVTTEYFJBE(146x12)(1x12)M(46x3)(12x15)ELAIIEJMLHRV(1x8)I(1x14)K(2x9)RN(1x14)E(81x6)(14x4)SHLOZXCBQTBEZF(40x2)YMEOXRNZXDIEEFLRQQDPWXILUOJQHDSUEKNXNQSP(3x2)TGQ(1x10)X(315x14)(307x10)(3x11)ZDV(260x4)(97x8)(20x11)YRELCFEJXQZADZSOJION(14x14)BGCJIBHVHEGFOD(3x14)PVA(33x13)KHUWKRRNHTHJCROVFAOIWGGOTIPKDMPRC(36x5)(2x8)HZ(22x14)YZSUXCHXDEPXIGCWUOKUXZ(62x10)(15x7)JZUDNJCWXTQAMOM(4x10)BJDT(24x14)ETEADJJYZZDODVKPPXTBTUPC(40x1)(5x9)UZDRJ(24x2)VPGSGVADLRBFODBZBMWBRJFC(24x14)(10x10)NJQVLSVHKJ(1x15)B(1402x12)(1381x11)(690x9)(163x6)(76x1)(16x11)TTKEOWZUHJMAOJVI(4x15)LGFT(3x6)MYP(17x7)CHKQJJMHHGHDXWBSO(7x7)UJLDJLX(11x12)LGBIGRGMTBV(21x6)RISOUTKGCNPQLLDWNLYEA(5x14)IZRZO(19x8)(13x7)ZYNNYQLEROHNK(23x9)(3x13)KRN(9x5)(4x5)OXVO(185x5)(52x6)(6x4)QOSUZS(18x6)GUQOGCRNSAKDCOCTSE(10x14)KGZBUGVIIH(40x10)(6x12)CMZQRR(1x5)Q(15x11)WEKZHYYCTPIPOZJ(58x8)(1x4)A(6x8)ABJIRX(11x15)EQFJHQOVGLY(6x3)YYQMKZ(7x7)LKJYEWV(5x4)BPTKB(1x4)J(284x5)(63x10)(1x8)W(11x13)MPTRNQPSBXM(15x3)VHDTUWNDEGLNCSQ(2x1)CQ(6x2)OCFRSJ(63x9)(15x12)AEYDUUWROCUABMX(12x4)RPGECWZRBHLK(1x11)O(10x4)JCBDSFSXDE(13x11)(8x4)BEHBONOK(83x2)(4x6)ANAD(3x15)LOP(20x15)TJLFCNGAYSBMWACNIOME(14x14)OLVVHGNWUVNXMR(10x12)DAHIOTLOCP(30x9)(2x12)TR(16x3)DYWYHJLMIYAHQIIE(3x8)SNV(112x15)(19x8)PBXORKYLISLHVCJVBJP(74x10)(2x8)FP(24x13)ZXILHYHYDGDNGHIPFHLMRLQS(2x11)WN(21x13)RDQDPNVEOLOSPLAHQHHMY(1x9)R(14x6)LIIRDEBBHSKXZT(372x10)(164x2)(40x7)RMPKUSRDBXNZLGDXZIAUAZNQBJEMSBUJOJNPHHHI(12x15)IAFPAWBOSBOS(76x6)(5x6)UYNUU(25x15)XPXFOEMDDICGRJONJBWMOZCIW(8x5)KJJIEDUG(15x2)IEUTKVCMTTXZNTC(11x9)IKWCZMUNCOP(61x12)(54x13)(13x12)NIOHBMYALHOUO(7x10)KFDUHJL(2x3)NM(9x9)OSVPKOFSM(5x5)VAMMP(9x3)EZLMGESLP(102x5)(26x5)(7x9)NHCIGIE(3x3)IVY(1x2)L(12x7)UXAUQLEXZGXN(46x6)(1x14)R(11x9)QTBPNKUFZOA(16x9)DLXKSEJJVMWIIHPB(157x8)(30x4)(13x15)TNSMJZJMNEUQM(4x12)HRAW(113x15)(17x4)(3x13)VQG(2x11)YK(4x9)GMIK(15x12)YGMZABAZZNHPRHP(23x4)(5x13)ZBQGH(7x3)SPNLPWT(24x1)HVEWGOENETTTKKBJHMBEFJSJ(6x14)WGBSYS(2694x1)(873x13)(591x15)(1x2)H(14x12)(9x8)(4x7)PHPZ(59x10)(10x7)EQJUHLQDSB(11x6)MHGNANYAWWK(3x8)FEN(11x12)RCPCNTVKIXQ(491x7)(78x14)(40x11)YVRYFJZMQREHNXZZPWXKNPHSUTVUGVEOPFQQBLOJ(25x1)(13x1)HQFQJIYOMZFGW(1x8)F(182x6)(86x14)(12x9)WODINQMTBDAX(6x7)JFCXXM(6x1)FKJPPD(40x2)IDAKJRAQIDKLPCCATMTFTOWNPLHKNJBTAVVHUWWN(53x8)(4x1)FXRX(9x1)DCBBRHJVU(2x2)RA(10x14)IWJGLMPMBS(1x5)H(14x2)WXKMITJBMZACIB(5x2)WLBVL(5x1)XNGOL(193x3)(6x8)ANFCUH(11x13)ZVGWPGYGIAR(72x4)(9x10)LUYDGWJLX(8x1)WUXTMRZR(2x3)FK(21x8)AGZIOWSLPHAKSUPECVOHV(4x12)FDXE(6x12)(1x8)M(68x7)(3x4)EOK(28x13)JXAMSHCQOBIUKUHUFYOOZJRMMNCW(19x4)YBUXDOFHTQVATUPANAF(1x15)H(110x13)(93x7)(87x2)(4x12)GMOE(50x11)(13x3)VHUHCBUNINBAH(9x14)ABWUPTZJB(10x1)ULUUYHAWHR(14x7)RSQMESIUXRZOVL(6x4)FBTNDA(5x7)ADGJH(139x5)(131x10)(123x14)(88x6)(1x11)A(17x13)XCWUXQVXMMRLURVHL(9x12)NBLNMYWQH(23x14)IOMVENQGFGYSOQNKKMXALXR(7x6)OWEXJQO(23x1)BGMPXSGMVQUXQJNAGUDPASW(168x14)(149x3)(17x1)(11x1)PPOPWWURQYN(119x7)(63x1)(4x14)CIWA(9x5)(4x3)YHDL(32x10)THARHNYWOIICGXLNEHOTTIEJXOLESVFO(44x2)(30x2)FMAVRVLKELMJLGHIPGCRCHJFVTBSUP(3x3)SIW(7x8)BIFVNRC(706x15)(699x8)(6x6)(1x1)B(284x11)(154x1)(26x12)BCUDXLZNEUYZIEKRPJNGEFKMNE(49x5)JNLLBDIRMRINXOUMGKJXTVCKAMZCEPVXFRIUUQXUQAHXXWERV(41x4)(5x15)JUNET(9x14)LAEKWBIYU(1x1)O(4x4)JFAB(13x4)KARCNJKHMFJFW(94x7)(64x7)(7x14)VRRWPHM(16x2)RYATIQNKHUXCZEGS(8x13)WZSZNRIH(3x7)TBE(2x4)DA(10x10)TJBORFEVFS(2x4)VE(8x15)YTADJOMR(4x2)XQAO(389x2)(171x3)(52x4)(1x6)C(14x1)QUCOESZSLGRLIJ(7x13)UVHYAWH(1x8)A(1x14)R(16x2)HOCCGBBDBBAJPVFU(52x8)(2x3)IV(20x3)BADNVTFDYEOJOSTOURIR(6x12)UAKYYR(1x12)D(3x8)RDJ(18x15)GDBLXRBQGDVOGYNIDB(7x9)RVLXMQP(146x2)(45x15)(3x3)NNY(10x14)EUROHLVNXH(4x12)JYRH(5x3)GJZII(2x1)IN(6x6)GPYYHE(70x5)(22x3)JSUZJGHKJQSJZHNHSBYXRX(11x4)CKNLLPRJDJB(11x9)EYWLHDJWYMZ(3x4)EOQ(39x11)(19x11)(12x15)ZSNCSSNGFNWK(7x11)QKRQMES(915x15)(657x4)(121x15)(21x4)(6x9)PBLEYF(5x3)JYILW(88x7)(48x6)(18x11)LHFNPRFKADOZQRHQVE(5x9)JSXCT(8x2)QOQRTIAA(7x3)NKKNWLS(16x4)URODMQWUOAUZDVTW(203x11)(196x3)(72x2)(1x12)L(2x3)AO(8x3)XROVOMDL(9x8)YZAEPPLFP(25x5)TJCBFMVSXVPIIOUHRJCUZAFPK(35x9)(22x5)BSQZOCOFMKGAVXARGGFCYV(2x1)BR(46x10)(3x1)MNZ(13x4)EBBUVWXRIWLMZ(13x8)EXOJUNPCWPYQE(9x14)(3x15)NYG(4x3)XNAD(6x3)OAGYDW(299x3)(130x5)(5x5)ZIVTZ(4x8)WRBW(73x12)(5x13)TCVNI(25x12)TLVHEMSRDZWQRIYKHDGLZVLEQ(24x3)PIOJWVRBAOPTXHUJAGHCRGNK(24x14)VCVZEHKJWAPXJDMALSUKRZAW(30x4)DMROHLLFJEFQZPAEVOYCSESESVCDPT(107x1)(19x11)XYGUSLMMCMUYFOZZCSG(9x13)(4x5)TMYS(2x1)BK(1x3)L(46x13)(40x7)JGIWCASPBLNAZSSBXMFLCZNHCLRYKJTSKTRIYXZD(7x7)SIMRJYC(243x12)(219x7)(4x8)XKYN(202x11)(26x11)(4x11)JIBP(3x12)TUQ(1x12)U(78x11)(10x12)PYKJEJKLOP(7x12)MGGQRIM(6x3)WDBTTC(10x6)EFUZOEPGTG(15x8)ULWOSKACKQHHDTH(2x5)OX(24x4)(1x13)Q(3x10)PLC(2x11)AZ(40x14)(4x3)IOIG(7x15)QQTGOCG(4x1)TTYK(4x1)KMKT(11x2)DUFCFLWJKDO(4988x11)(514x13)(184x10)(176x15)(168x14)(49x8)(11x13)NGQSRMSYVIT(5x13)LIGXA(13x13)QLVGLJOXJZEMA(14x3)BHSJULNXUJNMLB(21x13)QWVNZXHEHTXEDXQKZCKZH(59x3)(23x14)IZNXJWCWIXNWKNQDTNQUAEO(23x6)GDBWPQKJXRWQSZJUZRGBNNF(14x4)(9x7)RQPHPKUPM(7x9)QVUICMY(269x12)(34x4)(11x1)IODKMJLLLKQ(10x15)KDIWUXJCVN(221x12)(47x9)(12x12)RCNHOSXDVYYI(21x11)(3x4)IJG(8x4)XBPLQPKV(150x6)(75x15)(2x6)DH(23x10)WKXGJRDSEZTLPKCMMUZZMXF(7x7)WURAPMO(3x4)RIC(12x6)MFVQJUULXSZX(9x7)LSYQTUAPN(47x14)(3x10)YZI(7x6)YHUFAXO(1x4)M(14x4)LANLTXIEINNYBW(6x3)(1x1)W(8x9)FNIRZGYT(3676x12)(585x11)(242x2)(19x8)(12x15)OWCUIMOZCPJU(210x4)(107x13)(10x14)BTVYEADZIL(39x12)UMDJKKZWWGKFLEFWKVTRGZMWUTEWWFYSVMIVJQF(3x10)NEL(28x11)MLIMLBMEATHPEVTQRQTHBUOCFZMW(65x2)(23x12)SGEKZUXQNIGZURVKPNAISOY(21x2)UGJLXKWJVUFGJURKHTETM(2x11)XQ(17x13)CTOVPHTPJVNUSQZLY(329x9)(27x4)(20x15)(6x7)SWYPVM(3x10)ICH(105x3)(7x2)(2x1)QZ(11x11)(5x14)XUSZN(69x8)(7x12)VCQYFSA(24x7)EFVFKBFLRAJTGXEQGICZSOSE(10x7)CNXAKLLDBZ(4x13)XFXW(20x5)(13x15)SQZPVKWYCGMLX(96x12)(9x10)QNJNUKACF(14x3)WBKWFXIFFTAGKJ(2x11)TM(47x7)(9x4)WKFDSSPUO(12x2)TNCXEWMSFUPL(3x7)BCH(1x10)W(49x5)(23x10)(17x8)LMJYTUJGSCJDSMNZI(1x14)A(7x3)DYODODD(735x4)(2x13)CT(147x12)(140x1)(10x14)(5x6)KBFDG(74x11)(3x7)ASG(6x1)BAMUUR(11x1)HYWHOBKJIPH(22x14)ROJWCVIRBUVOXMHEBMHRBD(4x6)IHCB(36x9)(2x12)KI(1x1)I(16x4)TYYWOESVEYUUSCSQ(272x12)(6x13)YBZCAF(2x12)XV(12x10)(7x5)EOKMUXF(91x8)(4x3)CYOY(76x4)(2x6)QT(29x5)NMTVCDRMTLDIVOECJLYHZUBPYGOFD(4x5)IAJR(11x10)YPFPNDBONFO(2x3)WI(129x6)(77x2)(10x14)PAQKAHBQAX(2x4)YV(19x1)KXUKEJINNRYFXQJKRSM(10x2)YJAIIRZOWD(7x4)MDVMTGB(19x6)(4x9)MMQC(5x6)VZZVQ(2x7)XE(2x3)EQ(2x1)MA(202x9)(183x5)(13x5)YGYLMWENWKOEP(8x15)MIAMCHRA(67x15)(2x14)RP(10x5)NVJOFHUZFU(19x13)ELUOKNLHOOIAYZOCIMD(10x13)DQTLOMUCCQ(70x4)(11x1)KZALNOFLDHG(15x13)WLWZWHTUHWOZLES(9x10)FMITUKLQU(3x14)WCL(2x6)CK(6x10)(1x2)W(76x10)(2x8)ML(62x11)(48x11)(4x12)IRUH(4x3)DBQU(22x15)DYDBCSWMYSBLRNSNGRWCEU(1x15)Z(745x3)(23x1)(6x8)OKKJKF(7x1)(2x1)UU(709x5)(217x7)(116x3)(41x11)OAOMKCXJMJKKPSYWLNBFUDEVLICRKCGHRTGCIUAXZ(17x12)SKMYSNPPLDSOKIKXI(10x2)AYWGQTPNPX(12x14)GQFNEYXBYAAN(4x2)DWAS(12x13)MGXEWSKMSNTH(69x8)(7x6)LEFUMOK(19x4)UREDJOQURHFQCDSOZKZ(8x13)QPNYHWBW(12x2)JVUTOZHSWMXS(143x9)(79x6)(5x6)ZLLEG(4x13)ZAKG(2x6)QM(32x5)ADNXICFDFEOECVZHIVQKALYWLJGUSOSI(9x9)AWIAWSRJZ(52x5)(5x6)QSJGP(10x1)KDADHYYLCR(4x9)BQEP(1x1)Z(6x9)OMYNHU(103x7)(86x5)(2x13)AB(45x6)PQHXQFEMSNVRLACWAKQOYTZVLYPGBLAVMANXZHEMATRCF(14x4)YEVRVCORQWAJYG(2x3)AC(6x4)(1x4)W(135x15)(4x9)NULK(79x7)(7x10)RVBBWHN(3x12)MEL(33x9)FQIMGFZZTZBDCAYWARBLFRRQTJROKZXOJ(6x8)PWSZAR(2x5)ZR(13x8)RGRLYMPEYXDYF(15x15)EKZSLEASGQCSSAQ(76x5)(3x1)GDV(14x4)BYSPLEVMSPGXHS(4x2)LIDY(33x9)(27x4)ZWOLHCSTTPJZTODWETGHTNMAPAF(1215x14)(142x4)(14x1)ODRTZPGCANTMRQ(11x12)FFJIYPJJDPY(18x13)(12x7)PHABYHRKCIBS(72x12)TLUCYATALAFMLBSLTDHFNEGCVYKQFKPHVAMBSCYPSYMMGFGEPKMZRVXAZLGQQGCAQVIDKQCZ(119x10)(100x8)(6x6)ZKHOPF(37x8)JZJYXJTGQWXJKOWCEGRYFWORONDPKWDHGQFWR(9x10)JZTDQPVOV(7x11)MNMFBYO(12x9)(6x12)TEOCNK(6x11)(1x9)U(413x10)(1x12)W(357x6)(81x1)(20x13)AXMPRMJPLLNQTKNAKAKL(15x11)NCYQCFJRFVEBMBE(10x15)IDMWCCMJMT(9x15)KDITVSFLX(8x13)LWDZHEIH(85x4)(9x8)DNTHBQVEK(3x12)RCQ(17x5)IONTLMAHANUFDOIZZ(3x1)IKC(24x10)YQLVKHSGEHGXGFYSVJGHUHUA(109x4)(4x12)XZEO(12x5)HEZUPCXXEENI(12x12)OMJTLBITZWOB(13x13)YWOEGEYKAOZJS(36x8)VUZJQCVRHXSSCZNTEFKDZLVHDVCJSREVEVCB(43x6)(2x4)RT(4x12)CIZV(20x6)HHICUGNPVNOEZZGDLIZY(36x6)WRYFVILIDECKLNDCCWDEBAAPNRQVLQTWUQRC(260x7)(81x9)(5x1)XTIWO(7x2)(2x7)HZ(47x3)(6x5)EJMXOK(10x14)CVISHTXMOH(6x12)QCQAWT(1x12)V(1x3)Y(165x10)(21x10)PSYSIOEUPVJSLHBRVCOJD(39x12)(12x14)UBTGKOQEIYFM(5x4)CLHJC(5x4)FWNYB(9x13)ZHUPCPRPR(39x13)(10x15)YKYHEZRRDL(3x9)TRX(8x15)STWMOZDH(23x10)(2x9)ZM(2x7)MV(3x13)OQK(243x11)(210x8)(42x14)(17x12)JIOXSDZFXPPALZIKA(12x5)VJLEWBRVXMCD(23x2)VNXQYVPIRTMBGPKVZNTOFOG(61x6)(7x4)NSPFDMJ(9x14)TVHJEJSSJ(2x13)IJ(13x9)QTFHJIOJOQAOA(1x11)C(59x3)(6x11)MSQZOU(31x14)VLYOENWNIUSCUPMSOZEFABALZGGUXSZ(3x12)MIA(13x5)XZEMQZEXZTHJP(1x14)O(358x8)(162x14)(39x11)(13x5)(7x10)ZEJGPTO(1x12)V(8x7)PFNFRIMK(8x12)(2x13)LL(47x1)(41x8)(1x6)W(16x10)KZDYKHCTWZXEKCNJ(6x11)BKPJMJ(42x15)MMVAWYBRUXHRRXCVQBRTDORBFQQBOOHMVEKUQKJQTP(58x11)(28x5)NMWGTZUQBNENKBJWXUSTOSCMPLCZ(18x7)XIOSACAMZDWOJMBKQD(105x2)(72x12)(48x12)(5x10)XABVT(4x1)FENC(3x3)FPK(3x2)BMX(7x2)CTTSNTO(11x2)(5x14)XLVEE(2x1)PI(6x10)XMZISE(2x6)AK(6x1)ZPYKXO(774x3)(10x4)QTZHPYSXNC(720x15)(226x14)(40x9)(2x10)BT(17x14)(2x15)SO(4x2)ECYN(2x10)JM(7x4)XOBYLTV(120x3)(1x3)N(19x12)PEGBFGRTJFJSVIQZTNS(2x5)JD(41x13)(3x13)YTK(6x4)FUJASF(5x10)NHCVS(5x7)EBSJH(27x3)MMLCNRRAUAKKAGPBUHZQKMJVRLY(35x8)(12x5)EUFDLSCJNJIW(1x11)F(5x8)OICJN(178x3)(1x5)O(164x12)(69x5)(1x3)Y(13x7)NJGIFSDNRZGUN(20x2)CHUHUOZQHKOBNBNITRCT(3x13)XHS(4x4)HCZB(47x10)(13x13)HKZXATQZXPKJC(3x6)LFO(5x2)ZUTAK(4x8)JGZZ(13x1)BPKJSEMKXVWPD(10x8)CFBDPLWXUF(4x11)DYMH(283x14)(100x12)(9x14)LWMYUMEGI(79x7)(73x7)FBVHIBPTQYOPEWFQTFYYLGGOYUBRWFHKOXUWAZPIAVVVOWQGVUUKSSIGQWGTGTVMFEUSTYTQV(55x2)(10x14)IKRUCTQUXX(32x5)(20x2)JNEGAYZJAEFMMZNDQAYI(1x5)N(36x10)(12x10)PFTBHPEYKBFW(11x7)YRKUEULAVQO(65x9)(13x12)NKUIAGSIXWKEW(38x10)(4x8)IVPO(12x2)ENSUUWUGMFDE(6x5)GBZVEV(1x4)H(18x4)(12x6)(6x15)(1x6)C(1798x6)(725x7)(718x4)(128x9)(72x4)(41x6)XHDCTSCOLQXDITGBJPZCFXWLCBVNRWZKIHXOYRZQE(2x11)AL(10x11)CKPZHZXSEL(44x2)(38x2)(24x12)KQQVZKDYTAXJIECUHRNEEHIE(2x5)MR(2x14)EX(525x9)(135x3)(24x1)(6x4)AJAHVA(8x4)FCQQTUCX(42x9)(16x1)YJXDRMKLAJWGHRSL(9x8)CYVVQKOEQ(1x8)S(11x7)CGKRJUPVKDK(28x3)HQMZNCYOAIJBKRAGXYWTWOMEDSBE(1x4)U(16x13)UWNXBMZLSDWJWXRY(13x14)VALDTDWVJQQYY(48x4)(8x5)(3x2)HCC(28x13)(10x14)UFDCSYFEPI(5x11)NPDJR(279x1)(72x15)(15x11)CZESSYYLTNHNNEL(4x12)SCJE(2x4)IK(2x13)UO(19x8)AXUVJUCVOZYXECUHXTP(101x2)(7x3)MUNLZOM(5x7)GYXMB(13x2)UGNTFKQKQNSBU(27x9)IVJLAPCSRKKUBGNZXYELDTFXXDJ(20x12)KHMCDFDXECBLOWYPQFYZ(13x2)VDLMHMTQWHSIS(66x11)(6x14)RHRBCF(12x12)QBPGBNHZPQMS(28x11)BMIFCPCTBLKBIXCWFNLFSAOGHDWA(36x10)(30x1)KQYVYKBALRKIFSCOPWNQPYGRSSDAFY(1057x14)(320x8)(131x14)(124x3)(6x1)(1x8)Y(11x11)RYCMRYHAPAM(12x4)(7x2)LMPRCHR(65x7)(20x12)FBGHCCVXKKFXNJJWLKIU(16x10)KIYAZDBPNWXQXAKQ(9x11)EEQGTCDVB(1x3)I(132x2)(125x1)(20x12)HBEZQGFLJSFHGOYMLHSG(19x7)(3x5)THM(6x4)XKBKJV(7x12)(2x8)DF(14x12)(8x14)AXZPIRCT(33x9)(20x11)JCTTWVAOXNBCDBCUVNCX(1x9)J(36x9)(30x9)GCKYVYDUIBAWHSKBTTAHOYQWUQJHIV(699x2)(400x2)(45x10)(2x12)DY(31x7)(2x13)CP(6x11)TCMIXN(5x13)GBDVM(3x11)JAD(136x14)(11x1)ABIOQIJMVTI(6x10)NNTWTD(29x6)(1x14)Q(16x9)NNLMOVNFVJLXXLJJ(66x6)(4x3)RAZW(11x3)EQUJQECMCRI(10x14)DWLVSFXKGZ(5x15)RGJPT(7x1)RDFSOXE(74x8)(5x8)NEBHU(7x15)UEWKNIH(45x7)(19x3)TLAIFAYOOOCZMBIKVOU(4x6)OZBT(5x14)JEPAV(108x8)(2x15)LU(21x7)(3x6)JAV(2x3)LL(1x6)J(2x12)DX(59x6)(12x4)QXLWMASKAATM(10x7)OWRCRLMNRR(1x6)X(5x8)FBCAK(3x13)SIC(211x15)(2x6)IG(196x10)(54x8)(10x6)ZVIJHGXDTL(4x6)WCBN(2x12)IP(7x4)YLCWERN(4x1)LVRK(59x7)(5x5)JSDEV(4x14)FJFZ(17x7)KGBZBEJEIMCGUMSPZ(3x8)TAF(3x7)JTW(64x12)(2x11)BL(7x8)EQAGDIV(1x4)X(13x12)WDLMTJDUILHTJ(11x13)CBRRLLSHSWI(1x1)G(61x3)(3x7)CVG(27x9)(3x5)WIL(13x1)KFMXZGHEODGKB(2x1)QU(7x11)(1x13)S(18x5)VCSBJGLOOVXYTVMKOJ(143x10)(74x5)(25x12)IRMWONJTNGIJCGCTHVQOPQPIB(2x13)EY(6x8)NWOYXV(17x1)VBWAHETINYXRWMUVH(14x6)XEWNDODPNFJNFR(36x10)(5x1)XVRMW(3x15)PEE(4x9)RIJF(3x3)SYV(19x8)(12x13)(1x4)P(1x2)H(13x7)UKWAWHHQFYDWF(96x11)(5x12)PRKUK(13x14)RDQYSCYBCMONV(36x9)(3x15)ZOZ(8x15)PSPDGSWF(8x6)BMEGXZMZ(17x7)RQNGEXECJCUYFXPMB(163x14)(75x12)(9x9)YKFJTBRHE(44x15)DDSGHUAIXMRFTUHJZKDCTCLFREDDDHFAFQXALBIGIEMS(5x3)ZFRYZ(66x4)(7x8)KMXIZSU(34x15)ETTRETRSNLYOQZNWUXCNGPPUJPQNFYYEEC(7x12)RFTTNRF(3x12)HVO(97x15)(9x13)EASXOBURZ(14x14)EPODGHCXUDADRA(7x10)ECBRZCQ(22x13)SCAQGLZJTRSFEBTFFDTDRZ(13x7)RHQRORLJVNLWN(6x2)INZFFT";
console.log(decompress(input).length);

/*
--- Part Two ---
Apparently, the file actually uses version two of the format.

In version two, the only difference is that markers within decompressed data are decompressed. This, the documentation explains, provides much more substantial compression capabilities, allowing many-gigabyte files to be stored in only a few kilobytes.

For example:

(3x3)XYZ still becomes XYZXYZXYZ, as the decompressed section contains no markers.
X(8x2)(3x3)ABCY becomes XABCABCABCABCABCABCY, because the decompressed data from the (8x2) marker is then further decompressed, thus triggering the (3x3) marker twice for a total of six ABC sequences.
(27x12)(20x12)(13x14)(7x10)(1x12)A decompresses into a string of A repeated 241920 times.
(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN becomes 445 characters long.
Unfortunately, the computer you brought probably doesn't have enough memory to actually decompress the file; you'll have to come up with another way to get its decompressed length.

What is the decompressed length of the file using this improved format?
*/
function decompress2(s) {
  var markerStart = s.indexOf("(");
  if (markerStart < 0) {
    return s.length;
  }
  var markerEnd = s.indexOf(")", markerStart);
  if (markerEnd < 0) {
    return s.length;
  }
  var length, count;
  [_, length, count] = s.slice(markerStart + 1, markerEnd).match(/(\d+)x(\d+)/);
  var repeatStart = markerEnd + 1;
  var repeatEnd = repeatStart + parseInt(length);
  return markerStart 
    + (parseInt(count) * decompress2(s.slice(repeatStart, repeatEnd))) 
    + decompress2(s.slice(repeatEnd));
}

console.assert(decompress2("ADVENT") == "ADVENT".length, "contains no markers and decompresses to itself with no changes");
console.assert(decompress2("A(1x5)BC") == "ABBBBBC".length, "repeats only the B a total of 5 times");
console.assert(decompress2("(3x3)XYZ") == "XYZXYZXYZ".length, "for a decompressed length of 9");
console.assert(decompress2("X(8x2)(3x3)ABCY") == "XABCABCABCABCABCABCY".length, "because the decompressed data from the (8x2) marker is then further decompressed, thus triggering the (3x3) marker twice for a total of six ABC sequences.");
console.assert(decompress2("(27x12)(20x12)(13x14)(7x10)(1x12)A") == 241920, "string of A repeated 241920 times");
console.assert(decompress2("(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN") == 445);
console.log(decompress2(input));
