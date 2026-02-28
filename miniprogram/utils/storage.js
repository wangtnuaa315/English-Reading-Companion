/**
 * 本地存储工具 - 管理历史记录和生词本
 */

const HISTORY_KEY = 'history'
const SAVED_WORDS_KEY = 'savedWords'
const MAX_HISTORY = 50

function saveHistory(record) {
    try {
        const history = getHistory()
        record.timestamp = record.timestamp || Date.now()
        record.id = 'h_' + record.timestamp + '_' + Math.random().toString(36).substr(2, 4)
        history.unshift(record)
        if (history.length > MAX_HISTORY) history.splice(MAX_HISTORY)
        wx.setStorageSync(HISTORY_KEY, history)
        return record.id
    } catch (e) {
        console.error('[Storage] Save history failed:', e)
        return null
    }
}

function getHistory() {
    try { return wx.getStorageSync(HISTORY_KEY) || [] }
    catch (e) { return [] }
}

function getHistoryById(id) {
    return getHistory().find(item => item.id === id) || null
}

function removeHistory(id) {
    try {
        const history = getHistory()
        const idx = history.findIndex(item => item.id === id)
        if (idx > -1) { history.splice(idx, 1); wx.setStorageSync(HISTORY_KEY, history) }
    } catch (e) { console.error('[Storage] Remove history failed:', e) }
}

function clearHistory() {
    try { wx.setStorageSync(HISTORY_KEY, []) } catch (e) { }
}

function saveWord(wordInfo) {
    try {
        const words = getWords()
        if (words.find(w => w.word.toLowerCase() === wordInfo.word.toLowerCase())) return false
        wordInfo.savedAt = Date.now()
        words.unshift(wordInfo)
        wx.setStorageSync(SAVED_WORDS_KEY, words)
        return true
    } catch (e) { return false }
}

function saveWords(wordList) {
    let count = 0
    wordList.forEach(w => { if (saveWord(w)) count++ })
    return count
}

function getWords() {
    try { return wx.getStorageSync(SAVED_WORDS_KEY) || [] }
    catch (e) { return [] }
}

function removeWord(word) {
    try {
        const words = getWords()
        const idx = words.findIndex(w => w.word.toLowerCase() === word.toLowerCase())
        if (idx > -1) { words.splice(idx, 1); wx.setStorageSync(SAVED_WORDS_KEY, words) }
    } catch (e) { }
}

function clearWords() {
    try { wx.setStorageSync(SAVED_WORDS_KEY, []) } catch (e) { }
}

function formatTime(timestamp) {
    const diff = Date.now() - timestamp
    const m = 60000, h = 3600000, d = 86400000
    if (diff < m) return '刚刚'
    if (diff < h) return Math.floor(diff / m) + '分钟前'
    if (diff < d) return Math.floor(diff / h) + '小时前'
    if (diff < 2 * d) return '昨天'
    if (diff < 7 * d) return Math.floor(diff / d) + '天前'
    const date = new Date(timestamp)
    return `${date.getMonth() + 1}月${date.getDate()}日`
}

module.exports = {
    saveHistory, getHistory, getHistoryById, removeHistory, clearHistory,
    saveWord, saveWords, getWords, removeWord, clearWords, formatTime
}
