import {getDoc, doc, updateDoc, setDoc, arrayUnion, arrayRemove} from "firebase/firestore"

export default function () {
    const { $firebaseDataBase } = useNuxtApp()

    // 取得單一欄位資料
    const getSingleData = async (collection, id) => {
        try {
            const docRef = doc($firebaseDataBase, collection, id)
            const res = await getDoc(docRef)
            return res.data()
        } catch (err) {
            console.log('err', err)
        }
    }

    // 編輯資料
    const editInfo = async (collection, id, data) => {
        try {
            const docRef = doc($firebaseDataBase, collection, id)
            await updateDoc(docRef, data)
            console.log('ok')
        } catch (err) {
            console.log(err)
        }
    }

    // 有 uid 則編輯內容，沒 uid 則新增欄位和內容 (購物車、收藏的新增)
    const addCartOrCollection = async (collection, uid, data) => {
        try {
            const docRef = doc($firebaseDataBase, collection, uid)

            await setDoc(docRef, {
                list: arrayUnion(data)
            }, {merge: true})

            console.log('ok')
        } catch (err) {
            console.log(err)
        }
    }

    // 移除購物車、我的最愛商品 (購物車、收藏的刪除) **資料須完全一致才能刪除
    const deleteCartOrCollection = async (collection, uid, data) => {
        try {
            const docRef = doc($firebaseDataBase, collection, uid)
            await updateDoc(docRef, {
                list: arrayRemove(data)
            })
            console.log('ok')
        } catch (err) {
            console.log(err)
        }
    }

    // 搜尋取得商品資料
    const searchProducts = async (keyword) => {
        try {
            let filterData = []
            const docRef = doc($firebaseDataBase, 'products', 'all')
            const res = await getDoc(docRef)
            filterData = res.data().list.filter((item) => {
                return item.title.match(keyword)
            })
            console.log(filterData)
        } catch (err) {
            console.log(err)
        }
    }

    // 儲存會員資料
    const saveUserInfo = async (uid, data) => {
        try {
            const docRef = doc($firebaseDataBase, "users", uid)
            await setDoc(docRef, data)
            console.log('ok')
        } catch (err) {
            console.log(err)
        }
    }

    return {
        getSingleData,
        editInfo,
        addCartOrCollection,
        deleteCartOrCollection,
        searchProducts,
        saveUserInfo
    }
}
