/**
 * 音标字典工具
 * 包含常用英语单词的国际音标 (IPA)
 */

// 常用英语单词音标字典
const phoneticsDict = {
    // A
    'a': '/ə/', 'abandon': '/əˈbændən/', 'ability': '/əˈbɪləti/', 'able': '/ˈeɪbəl/',
    'about': '/əˈbaʊt/', 'above': '/əˈbʌv/', 'accept': '/əkˈsɛpt/', 'according': '/əˈkɔːrdɪŋ/',
    'account': '/əˈkaʊnt/', 'across': '/əˈkrɔːs/', 'act': '/ækt/', 'action': '/ˈækʃən/',
    'actually': '/ˈæktʃuəli/', 'add': '/æd/', 'address': '/əˈdrɛs/', 'after': '/ˈæftər/',
    'again': '/əˈɡɛn/', 'against': '/əˈɡɛnst/', 'age': '/eɪdʒ/', 'ago': '/əˈɡoʊ/',
    'agree': '/əˈɡriː/', 'air': '/ɛr/', 'all': '/ɔːl/', 'allow': '/əˈlaʊ/',
    'almost': '/ˈɔːlmoʊst/', 'along': '/əˈlɔːŋ/', 'already': '/ɔːlˈrɛdi/', 'also': '/ˈɔːlsoʊ/',
    'always': '/ˈɔːlweɪz/', 'american': '/əˈmɛrɪkən/', 'among': '/əˈmʌŋ/', 'amount': '/əˈmaʊnt/',
    'an': '/ən/', 'and': '/ænd/', 'animal': '/ˈænɪməl/', 'another': '/əˈnʌðər/',
    'answer': '/ˈænsər/', 'any': '/ˈɛni/', 'anyone': '/ˈɛniwʌn/', 'anything': '/ˈɛniθɪŋ/',
    'appear': '/əˈpɪr/', 'apple': '/ˈæpəl/', 'area': '/ˈɛriə/', 'arm': '/ɑːrm/',
    'around': '/əˈraʊnd/', 'art': '/ɑːrt/', 'as': '/æz/', 'ask': '/æsk/',
    'at': '/æt/', 'attention': '/əˈtɛnʃən/', 'away': '/əˈweɪ/',

    // B
    'back': '/bæk/', 'bad': '/bæd/', 'ball': '/bɔːl/', 'bank': '/bæŋk/',
    'base': '/beɪs/', 'be': '/biː/', 'beautiful': '/ˈbjuːtɪfəl/', 'because': '/bɪˈkɔːz/',
    'become': '/bɪˈkʌm/', 'bed': '/bɛd/', 'before': '/bɪˈfɔːr/', 'begin': '/bɪˈɡɪn/',
    'behind': '/bɪˈhaɪnd/', 'believe': '/bɪˈliːv/', 'best': '/bɛst/', 'better': '/ˈbɛtər/',
    'between': '/bɪˈtwiːn/', 'big': '/bɪɡ/', 'bit': '/bɪt/', 'black': '/blæk/',
    'blood': '/blʌd/', 'blue': '/bluː/', 'board': '/bɔːrd/', 'body': '/ˈbɑːdi/',
    'book': '/bʊk/', 'born': '/bɔːrn/', 'both': '/boʊθ/', 'box': '/bɑːks/',
    'boy': '/bɔɪ/', 'break': '/breɪk/', 'bring': '/brɪŋ/', 'brother': '/ˈbrʌðər/',
    'build': '/bɪld/', 'building': '/ˈbɪldɪŋ/', 'business': '/ˈbɪznɪs/', 'but': '/bʌt/',
    'buy': '/baɪ/', 'by': '/baɪ/',

    // C
    'call': '/kɔːl/', 'camera': '/ˈkæmərə/', 'can': '/kæn/', 'car': '/kɑːr/',
    'card': '/kɑːrd/', 'care': '/kɛr/', 'carry': '/ˈkæri/', 'case': '/keɪs/',
    'cat': '/kæt/', 'catch': '/kætʃ/', 'cause': '/kɔːz/', 'center': '/ˈsɛntər/',
    'certain': '/ˈsɜːrtən/', 'chair': '/tʃɛr/', 'chance': '/tʃæns/', 'change': '/tʃeɪndʒ/',
    'character': '/ˈkærɪktər/', 'check': '/tʃɛk/', 'child': '/tʃaɪld/', 'children': '/ˈtʃɪldrən/',
    'choice': '/tʃɔɪs/', 'choose': '/tʃuːz/', 'church': '/tʃɜːrtʃ/', 'city': '/ˈsɪti/',
    'class': '/klæs/', 'clear': '/klɪr/', 'close': '/kloʊz/', 'cold': '/koʊld/',
    'color': '/ˈkʌlər/', 'come': '/kʌm/', 'common': '/ˈkɑːmən/', 'community': '/kəˈmjuːnɪti/',
    'company': '/ˈkʌmpəni/', 'computer': '/kəmˈpjuːtər/', 'concern': '/kənˈsɜːrn/',
    'condition': '/kənˈdɪʃən/', 'consider': '/kənˈsɪdər/', 'continue': '/kənˈtɪnjuː/',
    'control': '/kənˈtroʊl/', 'cost': '/kɔːst/', 'could': '/kʊd/', 'country': '/ˈkʌntri/',
    'couple': '/ˈkʌpəl/', 'course': '/kɔːrs/', 'court': '/kɔːrt/', 'cover': '/ˈkʌvər/',
    'create': '/kriˈeɪt/', 'cup': '/kʌp/', 'current': '/ˈkɜːrənt/', 'cut': '/kʌt/',

    // D
    'dark': '/dɑːrk/', 'daughter': '/ˈdɔːtər/', 'day': '/deɪ/', 'dead': '/dɛd/',
    'deal': '/diːl/', 'death': '/dɛθ/', 'decide': '/dɪˈsaɪd/', 'deep': '/diːp/',
    'degree': '/dɪˈɡriː/', 'describe': '/dɪˈskraɪb/', 'design': '/dɪˈzaɪn/', 'describe': '/dɪˈskraɪb/',
    'develop': '/dɪˈvɛləp/', 'development': '/dɪˈvɛləpmənt/', 'die': '/daɪ/', 'different': '/ˈdɪfərənt/',
    'difficult': '/ˈdɪfɪkəlt/', 'dinner': '/ˈdɪnər/', 'direction': '/dɪˈrɛkʃən/', 'discover': '/dɪˈskʌvər/',
    'discuss': '/dɪˈskʌs/', 'do': '/duː/', 'doctor': '/ˈdɑːktər/', 'dog': '/dɔːɡ/',
    'door': '/dɔːr/', 'down': '/daʊn/', 'draw': '/drɔː/', 'dream': '/driːm/',
    'drive': '/draɪv/', 'drop': '/drɑːp/', 'during': '/ˈdʊrɪŋ/',

    // E
    'each': '/iːtʃ/', 'early': '/ˈɜːrli/', 'earth': '/ɜːrθ/', 'east': '/iːst/',
    'easy': '/ˈiːzi/', 'eat': '/iːt/', 'economic': '/ˌɛkəˈnɑːmɪk/', 'education': '/ˌɛdʒʊˈkeɪʃən/',
    'effect': '/ɪˈfɛkt/', 'effort': '/ˈɛfərt/', 'eight': '/eɪt/', 'either': '/ˈiːðər/',
    'election': '/ɪˈlɛkʃən/', 'else': '/ɛls/', 'employee': '/ɪmˈplɔɪiː/', 'end': '/ɛnd/',
    'energy': '/ˈɛnərdʒi/', 'enjoy': '/ɪnˈdʒɔɪ/', 'enough': '/ɪˈnʌf/', 'enter': '/ˈɛntər/',
    'environment': '/ɪnˈvaɪrənmənt/', 'especially': '/ɪˈspɛʃəli/', 'even': '/ˈiːvən/',
    'evening': '/ˈiːvnɪŋ/', 'event': '/ɪˈvɛnt/', 'ever': '/ˈɛvər/', 'every': '/ˈɛvri/',
    'everybody': '/ˈɛvriˌbɑːdi/', 'everyone': '/ˈɛvriwʌn/', 'everything': '/ˈɛvriθɪŋ/',
    'evidence': '/ˈɛvɪdəns/', 'exactly': '/ɪɡˈzæktli/', 'example': '/ɪɡˈzæmpəl/',
    'experience': '/ɪkˈspɪriəns/', 'explain': '/ɪkˈspleɪn/', 'eye': '/aɪ/',
    'english': '/ˈɪŋɡlɪʃ/',

    // F
    'face': '/feɪs/', 'fact': '/fækt/', 'fall': '/fɔːl/', 'family': '/ˈfæməli/',
    'far': '/fɑːr/', 'fast': '/fæst/', 'father': '/ˈfɑːðər/', 'fear': '/fɪr/',
    'feel': '/fiːl/', 'few': '/fjuː/', 'field': '/fiːld/', 'fight': '/faɪt/',
    'fill': '/fɪl/', 'film': '/fɪlm/', 'final': '/ˈfaɪnəl/', 'finally': '/ˈfaɪnəli/',
    'find': '/faɪnd/', 'fine': '/faɪn/', 'finger': '/ˈfɪŋɡər/', 'finish': '/ˈfɪnɪʃ/',
    'fire': '/ˈfaɪər/', 'first': '/fɜːrst/', 'fish': '/fɪʃ/', 'five': '/faɪv/',
    'floor': '/flɔːr/', 'fly': '/flaɪ/', 'follow': '/ˈfɑːloʊ/', 'food': '/fuːd/',
    'foot': '/fʊt/', 'for': '/fɔːr/', 'force': '/fɔːrs/', 'foreign': '/ˈfɔːrɪn/',
    'forget': '/fərˈɡɛt/', 'form': '/fɔːrm/', 'forward': '/ˈfɔːrwərd/', 'four': '/fɔːr/',
    'free': '/friː/', 'friend': '/frɛnd/', 'from': '/frʌm/', 'front': '/frʌnt/',
    'full': '/fʊl/', 'fund': '/fʌnd/', 'future': '/ˈfjuːtʃər/',

    // G
    'game': '/ɡeɪm/', 'garden': '/ˈɡɑːrdən/', 'general': '/ˈdʒɛnərəl/', 'generation': '/ˌdʒɛnəˈreɪʃən/',
    'get': '/ɡɛt/', 'girl': '/ɡɜːrl/', 'give': '/ɡɪv/', 'glass': '/ɡlæs/',
    'go': '/ɡoʊ/', 'god': '/ɡɑːd/', 'good': '/ɡʊd/', 'government': '/ˈɡʌvərnmənt/',
    'great': '/ɡreɪt/', 'green': '/ɡriːn/', 'ground': '/ɡraʊnd/', 'group': '/ɡruːp/',
    'grow': '/ɡroʊ/', 'growth': '/ɡroʊθ/', 'guess': '/ɡɛs/', 'guy': '/ɡaɪ/',

    // H
    'hair': '/hɛr/', 'half': '/hæf/', 'hand': '/hænd/', 'hang': '/hæŋ/',
    'happen': '/ˈhæpən/', 'happy': '/ˈhæpi/', 'hard': '/hɑːrd/', 'have': '/hæv/',
    'he': '/hiː/', 'head': '/hɛd/', 'health': '/hɛlθ/', 'hear': '/hɪr/',
    'heart': '/hɑːrt/', 'heat': '/hiːt/', 'heavy': '/ˈhɛvi/', 'hello': '/həˈloʊ/',
    'help': '/hɛlp/', 'her': '/hɜːr/', 'here': '/hɪr/', 'herself': '/hɜːrˈsɛlf/',
    'high': '/haɪ/', 'him': '/hɪm/', 'himself': '/hɪmˈsɛlf/', 'his': '/hɪz/',
    'history': '/ˈhɪstəri/', 'hit': '/hɪt/', 'hold': '/hoʊld/', 'home': '/hoʊm/',
    'hope': '/hoʊp/', 'hospital': '/ˈhɑːspɪtəl/', 'hot': '/hɑːt/', 'hotel': '/hoʊˈtɛl/',
    'hour': '/ˈaʊər/', 'house': '/haʊs/', 'how': '/haʊ/', 'however': '/haʊˈɛvər/',
    'huge': '/hjuːdʒ/', 'human': '/ˈhjuːmən/', 'hundred': '/ˈhʌndrəd/', 'husband': '/ˈhʌzbənd/',

    // I
    'i': '/aɪ/', 'idea': '/aɪˈdiːə/', 'if': '/ɪf/', 'image': '/ˈɪmɪdʒ/',
    'imagine': '/ɪˈmædʒɪn/', 'impact': '/ˈɪmpækt/', 'important': '/ɪmˈpɔːrtənt/',
    'improve': '/ɪmˈpruːv/', 'in': '/ɪn/', 'include': '/ɪnˈkluːd/', 'increase': '/ɪnˈkriːs/',
    'indeed': '/ɪnˈdiːd/', 'indicate': '/ˈɪndɪkeɪt/', 'industry': '/ˈɪndəstri/',
    'information': '/ˌɪnfərˈmeɪʃən/', 'inside': '/ɪnˈsaɪd/', 'instead': '/ɪnˈstɛd/',
    'interest': '/ˈɪntrəst/', 'interesting': '/ˈɪntrəstɪŋ/', 'international': '/ˌɪntərˈnæʃənəl/',
    'into': '/ˈɪntuː/', 'investment': '/ɪnˈvɛstmənt/', 'is': '/ɪz/', 'issue': '/ˈɪʃuː/',
    'it': '/ɪt/',

    // J-K
    'job': '/dʒɑːb/', 'join': '/dʒɔɪn/', 'just': '/dʒʌst/',
    'keep': '/kiːp/', 'key': '/kiː/', 'kid': '/kɪd/', 'kill': '/kɪl/',
    'kind': '/kaɪnd/', 'king': '/kɪŋ/', 'kitchen': '/ˈkɪtʃɪn/', 'know': '/noʊ/',
    'knowledge': '/ˈnɑːlɪdʒ/',

    // L
    'land': '/lænd/', 'language': '/ˈlæŋɡwɪdʒ/', 'large': '/lɑːrdʒ/', 'last': '/læst/',
    'late': '/leɪt/', 'later': '/ˈleɪtər/', 'laugh': '/læf/', 'law': '/lɔː/',
    'lay': '/leɪ/', 'lead': '/liːd/', 'leader': '/ˈliːdər/', 'learn': '/lɜːrn/',
    'least': '/liːst/', 'leave': '/liːv/', 'left': '/lɛft/', 'leg': '/lɛɡ/',
    'less': '/lɛs/', 'let': '/lɛt/', 'letter': '/ˈlɛtər/', 'level': '/ˈlɛvəl/',
    'lie': '/laɪ/', 'life': '/laɪf/', 'light': '/laɪt/', 'like': '/laɪk/',
    'likely': '/ˈlaɪkli/', 'line': '/laɪn/', 'list': '/lɪst/', 'listen': '/ˈlɪsən/',
    'little': '/ˈlɪtəl/', 'live': '/lɪv/', 'long': '/lɔːŋ/', 'look': '/lʊk/',
    'lose': '/luːz/', 'loss': '/lɔːs/', 'lot': '/lɑːt/', 'love': '/lʌv/', 'low': '/loʊ/',

    // M
    'machine': '/məˈʃiːn/', 'main': '/meɪn/', 'major': '/ˈmeɪdʒər/', 'make': '/meɪk/',
    'man': '/mæn/', 'manage': '/ˈmænɪdʒ/', 'management': '/ˈmænɪdʒmənt/', 'many': '/ˈmɛni/',
    'market': '/ˈmɑːrkɪt/', 'may': '/meɪ/', 'maybe': '/ˈmeɪbiː/', 'me': '/miː/',
    'mean': '/miːn/', 'measure': '/ˈmɛʒər/', 'media': '/ˈmiːdiə/', 'medical': '/ˈmɛdɪkəl/',
    'meet': '/miːt/', 'meeting': '/ˈmiːtɪŋ/', 'member': '/ˈmɛmbər/', 'memory': '/ˈmɛməri/',
    'mention': '/ˈmɛnʃən/', 'menu': '/ˈmɛnjuː/', 'message': '/ˈmɛsɪdʒ/', 'method': '/ˈmɛθəd/',
    'middle': '/ˈmɪdəl/', 'might': '/maɪt/', 'military': '/ˈmɪlɪˌtɛri/', 'million': '/ˈmɪljən/',
    'mind': '/maɪnd/', 'minute': '/ˈmɪnɪt/', 'miss': '/mɪs/', 'model': '/ˈmɑːdəl/',
    'modern': '/ˈmɑːdərn/', 'moment': '/ˈmoʊmənt/', 'money': '/ˈmʌni/', 'month': '/mʌnθ/',
    'more': '/mɔːr/', 'morning': '/ˈmɔːrnɪŋ/', 'most': '/moʊst/', 'mother': '/ˈmʌðər/',
    'mouth': '/maʊθ/', 'move': '/muːv/', 'movement': '/ˈmuːvmənt/', 'movie': '/ˈmuːvi/',
    'much': '/mʌtʃ/', 'music': '/ˈmjuːzɪk/', 'must': '/mʌst/', 'my': '/maɪ/',
    'myself': '/maɪˈsɛlf/',

    // N
    'name': '/neɪm/', 'nation': '/ˈneɪʃən/', 'national': '/ˈnæʃənəl/', 'natural': '/ˈnætʃərəl/',
    'nature': '/ˈneɪtʃər/', 'near': '/nɪr/', 'nearly': '/ˈnɪrli/', 'necessary': '/ˈnɛsəˌsɛri/',
    'need': '/niːd/', 'network': '/ˈnɛtwɜːrk/', 'never': '/ˈnɛvər/', 'new': '/njuː/',
    'news': '/njuːz/', 'next': '/nɛkst/', 'nice': '/naɪs/', 'night': '/naɪt/',
    'no': '/noʊ/', 'nobody': '/ˈnoʊˌbɑːdi/', 'none': '/nʌn/', 'nor': '/nɔːr/',
    'north': '/nɔːrθ/', 'not': '/nɑːt/', 'note': '/noʊt/', 'nothing': '/ˈnʌθɪŋ/',
    'notice': '/ˈnoʊtɪs/', 'now': '/naʊ/', 'number': '/ˈnʌmbər/',

    // O
    'occur': '/əˈkɜːr/', 'of': '/ʌv/', 'off': '/ɔːf/', 'offer': '/ˈɔːfər/',
    'office': '/ˈɔːfɪs/', 'officer': '/ˈɔːfɪsər/', 'often': '/ˈɔːfən/', 'oh': '/oʊ/',
    'oil': '/ɔɪl/', 'ok': '/ˌoʊˈkeɪ/', 'old': '/oʊld/', 'on': '/ɑːn/',
    'once': '/wʌns/', 'one': '/wʌn/', 'only': '/ˈoʊnli/', 'onto': '/ˈɑːntuː/',
    'open': '/ˈoʊpən/', 'operation': '/ˌɑːpəˈreɪʃən/', 'opportunity': '/ˌɑːpərˈtuːnɪti/',
    'option': '/ˈɑːpʃən/', 'or': '/ɔːr/', 'order': '/ˈɔːrdər/', 'organization': '/ˌɔːrɡənɪˈzeɪʃən/',
    'other': '/ˈʌðər/', 'our': '/ˈaʊər/', 'out': '/aʊt/', 'outside': '/ˌaʊtˈsaɪd/',
    'over': '/ˈoʊvər/', 'own': '/oʊn/', 'owner': '/ˈoʊnər/',

    // P
    'page': '/peɪdʒ/', 'pain': '/peɪn/', 'paper': '/ˈpeɪpər/', 'parent': '/ˈpɛrənt/',
    'part': '/pɑːrt/', 'particular': '/pərˈtɪkjʊlər/', 'partner': '/ˈpɑːrtnər/',
    'party': '/ˈpɑːrti/', 'pass': '/pæs/', 'past': '/pæst/', 'patient': '/ˈpeɪʃənt/',
    'pattern': '/ˈpætərn/', 'pay': '/peɪ/', 'peace': '/piːs/', 'people': '/ˈpiːpəl/',
    'per': '/pɜːr/', 'perform': '/pərˈfɔːrm/', 'performance': '/pərˈfɔːrməns/',
    'perhaps': '/pərˈhæps/', 'period': '/ˈpɪriəd/', 'person': '/ˈpɜːrsən/', 'personal': '/ˈpɜːrsənəl/',
    'phone': '/foʊn/', 'phonetics': '/fəˈnɛtɪks/', 'photo': '/ˈfoʊtoʊ/', 'physical': '/ˈfɪzɪkəl/',
    'pick': '/pɪk/', 'picture': '/ˈpɪktʃər/', 'piece': '/piːs/', 'place': '/pleɪs/',
    'plan': '/plæn/', 'plant': '/plænt/', 'play': '/pleɪ/', 'player': '/ˈpleɪər/',
    'please': '/pliːz/', 'point': '/pɔɪnt/', 'police': '/pəˈliːs/', 'policy': '/ˈpɑːləsi/',
    'political': '/pəˈlɪtɪkəl/', 'poor': '/pʊr/', 'popular': '/ˈpɑːpjʊlər/',
    'population': '/ˌpɑːpjʊˈleɪʃən/', 'position': '/pəˈzɪʃən/', 'positive': '/ˈpɑːzətɪv/',
    'possible': '/ˈpɑːsəbəl/', 'power': '/ˈpaʊər/', 'practice': '/ˈpræktɪs/',
    'prepare': '/prɪˈpɛr/', 'present': '/ˈprɛzənt/', 'president': '/ˈprɛzɪdənt/',
    'pressure': '/ˈprɛʃər/', 'pretty': '/ˈprɪti/', 'prevent': '/prɪˈvɛnt/',
    'price': '/praɪs/', 'private': '/ˈpraɪvɪt/', 'probably': '/ˈprɑːbəbli/',
    'problem': '/ˈprɑːbləm/', 'process': '/ˈprɑːsɛs/', 'produce': '/prəˈduːs/',
    'product': '/ˈprɑːdʌkt/', 'production': '/prəˈdʌkʃən/', 'professional': '/prəˈfɛʃənəl/',
    'program': '/ˈproʊɡræm/', 'project': '/ˈprɑːdʒɛkt/', 'property': '/ˈprɑːpərti/',
    'protect': '/prəˈtɛkt/', 'prove': '/pruːv/', 'provide': '/prəˈvaɪd/',
    'public': '/ˈpʌblɪk/', 'pull': '/pʊl/', 'purpose': '/ˈpɜːrpəs/', 'push': '/pʊʃ/',
    'put': '/pʊt/',

    // Q-R
    'quality': '/ˈkwɑːləti/', 'question': '/ˈkwɛstʃən/', 'quickly': '/ˈkwɪkli/', 'quite': '/kwaɪt/',
    'race': '/reɪs/', 'raise': '/reɪz/', 'range': '/reɪndʒ/', 'rate': '/reɪt/',
    'rather': '/ˈræðər/', 'reach': '/riːtʃ/', 'read': '/riːd/', 'ready': '/ˈrɛdi/',
    'real': '/riːl/', 'reality': '/riˈæləti/', 'realize': '/ˈriːəlaɪz/', 'really': '/ˈriːəli/',
    'reason': '/ˈriːzən/', 'receive': '/rɪˈsiːv/', 'recent': '/ˈriːsənt/',
    'recently': '/ˈriːsəntli/', 'recognize': '/ˈrɛkəɡnaɪz/', 'record': '/ˈrɛkərd/',
    'red': '/rɛd/', 'reduce': '/rɪˈduːs/', 'region': '/ˈriːdʒən/', 'relate': '/rɪˈleɪt/',
    'relationship': '/rɪˈleɪʃənʃɪp/', 'remember': '/rɪˈmɛmbər/', 'remove': '/rɪˈmuːv/',
    'report': '/rɪˈpɔːrt/', 'represent': '/ˌrɛprɪˈzɛnt/', 'require': '/rɪˈkwaɪər/',
    'research': '/rɪˈsɜːrtʃ/', 'resource': '/ˈriːsɔːrs/', 'respond': '/rɪˈspɑːnd/',
    'response': '/rɪˈspɑːns/', 'rest': '/rɛst/', 'restaurant': '/ˈrɛstərɑːnt/',
    'result': '/rɪˈzʌlt/', 'return': '/rɪˈtɜːrn/', 'reveal': '/rɪˈviːl/',
    'rich': '/rɪtʃ/', 'right': '/raɪt/', 'rise': '/raɪz/', 'risk': '/rɪsk/',
    'road': '/roʊd/', 'rock': '/rɑːk/', 'role': '/roʊl/', 'room': '/ruːm/',
    'rule': '/ruːl/', 'run': '/rʌn/',

    // S
    'safe': '/seɪf/', 'same': '/seɪm/', 'save': '/seɪv/', 'say': '/seɪ/',
    'scene': '/siːn/', 'school': '/skuːl/', 'science': '/ˈsaɪəns/', 'season': '/ˈsiːzən/',
    'seat': '/siːt/', 'second': '/ˈsɛkənd/', 'see': '/siː/', 'seek': '/siːk/',
    'seem': '/siːm/', 'sell': '/sɛl/', 'send': '/sɛnd/', 'sense': '/sɛns/',
    'sentence': '/ˈsɛntəns/', 'serve': '/sɜːrv/', 'service': '/ˈsɜːrvɪs/', 'set': '/sɛt/',
    'seven': '/ˈsɛvən/', 'several': '/ˈsɛvərəl/', 'shake': '/ʃeɪk/', 'share': '/ʃɛr/',
    'she': '/ʃiː/', 'short': '/ʃɔːrt/', 'should': '/ʃʊd/', 'shoulder': '/ˈʃoʊldər/',
    'show': '/ʃoʊ/', 'side': '/saɪd/', 'sign': '/saɪn/', 'significant': '/sɪɡˈnɪfɪkənt/',
    'similar': '/ˈsɪmɪlər/', 'simple': '/ˈsɪmpəl/', 'simply': '/ˈsɪmpli/', 'since': '/sɪns/',
    'sing': '/sɪŋ/', 'sister': '/ˈsɪstər/', 'sit': '/sɪt/', 'situation': '/ˌsɪtʃuˈeɪʃən/',
    'six': '/sɪks/', 'size': '/saɪz/', 'skin': '/skɪn/', 'small': '/smɔːl/',
    'smile': '/smaɪl/', 'so': '/soʊ/', 'social': '/ˈsoʊʃəl/', 'society': '/səˈsaɪəti/',
    'soldier': '/ˈsoʊldʒər/', 'some': '/sʌm/', 'somebody': '/ˈsʌmˌbɑːdi/',
    'someone': '/ˈsʌmwʌn/', 'something': '/ˈsʌmθɪŋ/', 'sometimes': '/ˈsʌmtaɪmz/',
    'son': '/sʌn/', 'song': '/sɔːŋ/', 'soon': '/suːn/', 'sort': '/sɔːrt/',
    'sound': '/saʊnd/', 'south': '/saʊθ/', 'space': '/speɪs/', 'speak': '/spiːk/',
    'special': '/ˈspɛʃəl/', 'spend': '/spɛnd/', 'sport': '/spɔːrt/', 'spring': '/sprɪŋ/',
    'stand': '/stænd/', 'standard': '/ˈstændərd/', 'star': '/stɑːr/', 'start': '/stɑːrt/',
    'state': '/steɪt/', 'stay': '/steɪ/', 'step': '/stɛp/', 'still': '/stɪl/',
    'stock': '/stɑːk/', 'stop': '/stɑːp/', 'store': '/stɔːr/', 'story': '/ˈstɔːri/',
    'street': '/striːt/', 'strong': '/strɔːŋ/', 'student': '/ˈstuːdənt/',
    'study': '/ˈstʌdi/', 'stuff': '/stʌf/', 'subject': '/ˈsʌbdʒɪkt/', 'success': '/səkˈsɛs/',
    'successful': '/səkˈsɛsfəl/', 'such': '/sʌtʃ/', 'suddenly': '/ˈsʌdənli/',
    'suggest': '/səˈdʒɛst/', 'summer': '/ˈsʌmər/', 'support': '/səˈpɔːrt/',
    'sure': '/ʃʊr/', 'surface': '/ˈsɜːrfɪs/', 'system': '/ˈsɪstəm/',

    // T
    'table': '/ˈteɪbəl/', 'take': '/teɪk/', 'talk': '/tɔːk/', 'task': '/tæsk/',
    'tax': '/tæks/', 'teach': '/tiːtʃ/', 'teacher': '/ˈtiːtʃər/', 'team': '/tiːm/',
    'technology': '/tɛkˈnɑːlədʒi/', 'tell': '/tɛl/', 'ten': '/tɛn/', 'term': '/tɜːrm/',
    'test': '/tɛst/', 'than': '/ðæn/', 'thank': '/θæŋk/', 'that': '/ðæt/',
    'the': '/ðə/', 'their': '/ðɛr/', 'them': '/ðɛm/', 'then': '/ðɛn/',
    'there': '/ðɛr/', 'these': '/ðiːz/', 'they': '/ðeɪ/', 'thing': '/θɪŋ/',
    'think': '/θɪŋk/', 'this': '/ðɪs/', 'those': '/ðoʊz/', 'though': '/ðoʊ/',
    'thought': '/θɔːt/', 'thousand': '/ˈθaʊzənd/', 'three': '/θriː/', 'through': '/θruː/',
    'throw': '/θroʊ/', 'time': '/taɪm/', 'to': '/tuː/', 'today': '/təˈdeɪ/',
    'together': '/təˈɡɛðər/', 'tonight': '/təˈnaɪt/', 'too': '/tuː/', 'top': '/tɑːp/',
    'total': '/ˈtoʊtəl/', 'tough': '/tʌf/', 'toward': '/tɔːrd/', 'town': '/taʊn/',
    'trade': '/treɪd/', 'traditional': '/trəˈdɪʃənəl/', 'training': '/ˈtreɪnɪŋ/',
    'translation': '/trænzˈleɪʃən/', 'travel': '/ˈtrævəl/', 'treat': '/triːt/',
    'treatment': '/ˈtriːtmənt/', 'tree': '/triː/', 'trial': '/ˈtraɪəl/', 'trip': '/trɪp/',
    'trouble': '/ˈtrʌbəl/', 'true': '/truː/', 'truth': '/truːθ/', 'try': '/traɪ/',
    'turn': '/tɜːrn/', 'two': '/tuː/', 'type': '/taɪp/',

    // U
    'under': '/ˈʌndər/', 'understand': '/ˌʌndərˈstænd/', 'unit': '/ˈjuːnɪt/',
    'until': '/ʌnˈtɪl/', 'up': '/ʌp/', 'upon': '/əˈpɑːn/', 'us': '/ʌs/',
    'use': '/juːz/', 'usually': '/ˈjuːʒuəli/',

    // V
    'value': '/ˈvæljuː/', 'various': '/ˈvɛriəs/', 'very': '/ˈvɛri/', 'view': '/vjuː/',
    'visit': '/ˈvɪzɪt/', 'voice': '/vɔɪs/', 'vote': '/voʊt/',

    // W
    'wait': '/weɪt/', 'walk': '/wɔːk/', 'wall': '/wɔːl/', 'want': '/wɑːnt/',
    'war': '/wɔːr/', 'watch': '/wɑːtʃ/', 'water': '/ˈwɔːtər/', 'way': '/weɪ/',
    'we': '/wiː/', 'weapon': '/ˈwɛpən/', 'wear': '/wɛr/', 'week': '/wiːk/',
    'weight': '/weɪt/', 'well': '/wɛl/', 'west': '/wɛst/', 'western': '/ˈwɛstərn/',
    'what': '/wɑːt/', 'whatever': '/wɑːtˈɛvər/', 'when': '/wɛn/', 'where': '/wɛr/',
    'whether': '/ˈwɛðər/', 'which': '/wɪtʃ/', 'while': '/waɪl/', 'white': '/waɪt/',
    'who': '/huː/', 'whole': '/hoʊl/', 'whom': '/huːm/', 'whose': '/huːz/',
    'why': '/waɪ/', 'wide': '/waɪd/', 'wife': '/waɪf/', 'will': '/wɪl/',
    'win': '/wɪn/', 'wind': '/wɪnd/', 'window': '/ˈwɪndoʊ/', 'wish': '/wɪʃ/',
    'with': '/wɪð/', 'within': '/wɪˈðɪn/', 'without': '/wɪˈðaʊt/', 'woman': '/ˈwʊmən/',
    'wonder': '/ˈwʌndər/', 'word': '/wɜːrd/', 'work': '/wɜːrk/', 'worker': '/ˈwɜːrkər/',
    'world': '/wɜːrld/', 'worry': '/ˈwɜːri/', 'would': '/wʊd/', 'write': '/raɪt/',
    'writer': '/ˈraɪtər/', 'wrong': '/rɔːŋ/',

    // Y-Z
    'yard': '/jɑːrd/', 'yeah': '/jæ/', 'year': '/jɪr/', 'yes': '/jɛs/',
    'yet': '/jɛt/', 'you': '/juː/', 'young': '/jʌŋ/', 'your': '/jɔːr/',
    'youth': '/juːθ/',
    'zero': '/ˈzɪroʊ/',

    // 常用补充与技术词汇
    'guide': '/ɡaɪd/', 'react': '/riˈækt/', 'next': '/nɛkst/', 'application': '/ˌæplɪˈkeɪʃən/',
    'maintain': '/meɪnˈteɪn/', 'vercel': '/ˈvɜːrsəl/', 'contain': '/kənˈteɪn/',
    'category': '/ˈkætəˌɡɔːri/', 'prioritize': '/praɪˈɔːrɪˌtaɪz/', 'automate': '/ˈɔːtəˌmeɪt/',
    'refactor': '/riːˈfæktər/', 'code': '/koʊd/', 'comprehensive': '/ˌkɑːmprɪˈhɛnsɪv/',
    'optimization': '/ˌɑːptɪmɪˈzeɪʃən/', 'optimize': '/ˈɑːptɪˌmaɪz/', 'feature': '/ˈfiːtʃər/',
    'update': '/ʌpˈdeɪt/', 'version': '/ˈvɜːrʒən/', 'user': '/ˈjuːzər/', 'data': '/ˈdeɪtə/',

    // 幼儿与交通基础词汇补充
    'bike': '/baɪk/', 'skateboard': '/ˈskeɪtbɔːrd/', 'scooter': '/ˈskuːtər/',
    'bus': '/bʌs/', 'train': '/treɪn/', 'subway': '/ˈsʌbweɪ/', 'ride': '/raɪd/',
    'level': '/ˈlɛvəl/', 'grade': '/ɡreɪd/', 'elementary': '/ˌɛlɪˈmɛntəri/', 'ross': '/rɔːs/',
    'bubble': '/ˈbʌbəl/', 'soap': '/soʊp/', 'pocket': '/ˈpɑːkɪt/', 'material': '/məˈtɪriəl/',
    'inside': '/ɪnˈsaɪd/', 'thing': '/θɪŋ/', 'many': '/ˈmɛni/', 'people': '/ˈpiːpəl/',
    'blow': '/bloʊ/', 'pop': '/pɑːp/', 'round': '/raʊnd/', 'wand': '/wɑːnd/',

    // 单字母补充
    'b': '/biː/', 'c': '/siː/', 'd': '/diː/', 'e': '/iː/', 'f': '/ɛf/',
    'g': '/dʒiː/', 'h': '/eɪtʃ/', 'j': '/dʒeɪ/', 'k': '/keɪ/', 'l': '/ɛl/',
    'm': '/ɛm/', 'n': '/ɛn/', 'o': '/oʊ/', 'p': '/piː/', 'q': '/kjuː/',
    'r': '/ɑːr/', 's': '/ɛs/', 't': '/tiː/', 'u': '/juː/', 'v': '/viː/',
    'w': '/ˈdʌbljuː/', 'x': '/ɛks/', 'y': '/waɪ/', 'z': '/ziː/'
}

/**
 * 获取单词的国际音标
 * @param {string} word - 英文单词
 * @returns {string} 音标字符串，如 /həˈloʊ/
 */
function getPhonetic(word) {
    if (!word) return ''
    const matchResult = word.toLowerCase().match(/[a-z]+/);
    if (!matchResult) return ''
    let lowerWord = matchResult[0]

    // 1. 完全匹配
    if (phoneticsDict[lowerWord]) return phoneticsDict[lowerWord]

    // 2. 尝试还原复数/单三后缀 (s, es, ies)
    if (lowerWord.endsWith('s')) {
        let base = lowerWord.slice(0, -1)
        if (phoneticsDict[base]) return phoneticsDict[base]

        if (lowerWord.endsWith('es')) {
            base = lowerWord.slice(0, -2)
            if (phoneticsDict[base]) return phoneticsDict[base]
        }

        if (lowerWord.endsWith('ies')) {
            base = lowerWord.slice(0, -3) + 'y'
            if (phoneticsDict[base]) return phoneticsDict[base]
        }
    }

    // 3. 尝试还原过去式后缀 (ed, ied)
    if (lowerWord.endsWith('ed')) {
        let base = lowerWord.slice(0, -1) // e.g. baked -> bake
        if (phoneticsDict[base]) return phoneticsDict[base]

        base = lowerWord.slice(0, -2) // e.g. played -> play
        if (phoneticsDict[base]) return phoneticsDict[base]

        if (lowerWord.endsWith('ied')) {
            base = lowerWord.slice(0, -3) + 'y' // e.g. studied -> study
            if (phoneticsDict[base]) return phoneticsDict[base]
        }

        // 双写辅音还原 (e.g. stopped -> stop)
        if (lowerWord.length >= 5 && lowerWord[lowerWord.length - 3] === lowerWord[lowerWord.length - 4]) {
            base = lowerWord.slice(0, -3)
            if (phoneticsDict[base]) return phoneticsDict[base]
        }
    }

    // 4. 尝试还原进行时后缀 (ing)
    if (lowerWord.endsWith('ing')) {
        let base = lowerWord.slice(0, -3) // e.g. playing -> play
        if (phoneticsDict[base]) return phoneticsDict[base]

        base = lowerWord.slice(0, -3) + 'e' // e.g. making -> make
        if (phoneticsDict[base]) return phoneticsDict[base]

        // 双写辅音还原 (e.g. getting -> get, running -> run)
        if (lowerWord.length >= 6 && lowerWord[lowerWord.length - 4] === lowerWord[lowerWord.length - 5]) {
            base = lowerWord.slice(0, -4)
            if (phoneticsDict[base]) return phoneticsDict[base]
        }
    }

    return ''
}

/**
 * 批量获取音标
 * @param {string[]} words - 单词数组
 * @returns {Object[]} 包含 word 和 phonetic 的数组
 */
function getPhonetics(words) {
    return words.map(word => ({
        word: word,
        phonetic: getPhonetic(word)
    }))
}

// 内存中缓存新查到的音标，避免重复请求
const memoryCache = {}

/**
 * 异步获取单词的国际音标 (先查本地，没有则请求网络 API 并缓存)
 * @param {string} word - 英文单词
 * @returns {Promise<string>} 音标字符串
 */
function getPhoneticAsync(word) {
    if (!word) return Promise.resolve('')

    // 提取纯净字符（小写连续字母）
    const matchResult = word.toLowerCase().match(/[a-z]+/);
    if (!matchResult) return Promise.resolve('')
    let lowerWord = matchResult[0]

    // 1. 先查本地常备字典 (包括现有的复数还原算法)
    const localResult = getPhonetic(word)
    if (localResult) return Promise.resolve(localResult)

    // 2. 查内存中缓存
    if (memoryCache[lowerWord]) return Promise.resolve(memoryCache[lowerWord])

    // 3. 查本地 Storage 缓存
    const storageCache = wx.getStorageSync('phonetics_api_cache') || {}
    if (storageCache[lowerWord]) {
        memoryCache[lowerWord] = storageCache[lowerWord]
        return Promise.resolve(storageCache[lowerWord])
    }

    // 4. 发起网络请求 (使用 Free Dictionary API，无需鉴权免费无限量)
    return new Promise((resolve) => {
        wx.request({
            url: `https://api.dictionaryapi.dev/api/v2/entries/en/${lowerWord}`,
            method: 'GET',
            success: (res) => {
                let phonetic = ''
                if (res.statusCode === 200 && res.data && res.data.length > 0) {
                    const entry = res.data[0]
                    // API 有时在顶层提供 phonetic，有时在 phonetics 数组里
                    if (entry.phonetic) {
                        phonetic = entry.phonetic
                    } else if (entry.phonetics && entry.phonetics.length > 0) {
                        for (let p of entry.phonetics) {
                            if (p.text) {
                                phonetic = p.text
                                break
                            }
                        }
                    }
                }

                if (phonetic) {
                    // 确保证前后有斜杠
                    if (!phonetic.startsWith('/')) phonetic = '/' + phonetic
                    if (!phonetic.endsWith('/')) phonetic = phonetic + '/'

                    // 存入缓存
                    memoryCache[lowerWord] = phonetic
                    storageCache[lowerWord] = phonetic
                    wx.setStorage({ key: 'phonetics_api_cache', data: storageCache })
                }
                resolve(phonetic)
            },
            fail: () => resolve('') // 防止网络出错卡或者白屏
        })
    })
}

module.exports = {
    getPhonetic,
    getPhoneticAsync,
    getPhonetics,
    phoneticsDict
}
