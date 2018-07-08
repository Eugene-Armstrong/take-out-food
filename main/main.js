// Write your cade below:
'use strict';

const { loadAllItems } = require('../main/items');
const { loadPromotions } = require('../main/promotions');

const allItemsInfo = loadAllItems();
const promotions = loadPromotions();

function bestCharge(selectedItems) {
    // 1 格式化输入
    let formattedInputs = formatInputs(selectedItems);

    // 2 整合获取已点各个菜品信息
    let eachItemInfo = getEachItemInfo(formattedInputs, allItemsInfo);

    // 3 计算已点菜品优惠前总价
    let originalSumPrice = calculateOriginalSumPrice(eachItemInfo);

    // 4-1 计算第1种优惠下所有已点菜品总价
    let discSumPrice1 = calculateDiscSumPrice1(originalSumPrice);
    // 4-2 计算第2种优惠下所有已点菜品总价
    let discSumPrice2 = calculateDiscSumPrice2(eachItemInfo, promotions, originalSumPrice);

    // 5 获取最佳优惠信息
    let bestChargeInfo = getBestChargeInfo(discSumPrice1, discSumPrice2, promotions);

    // 6 返回最终汇总信息
    // returnSummary(bestCharge);
}

/**
 * 格式化输入 10 lines
 * @param {输入信息} items 
 */
function formatInputs(items) {
    let formattedInputs = [];
    for (let item of items) {
        let tmp = item.split(" x ");
        formattedInputs.push({
            id: tmp[0],
            count: parseInt(tmp[1])
        });
    }
    return formattedInputs;
}

/**
 * 比对并获取已点菜品信息 12 lines
 * @param {已点菜品信息} eachItemInfo 
 */
function getEachItemInfo(formatInputs, allItemsInfo) {
    let eachItemInfo = [];
    for (let allItemsObj of allItemsInfo) {
        for (let formatInputObj of formatInputs) {
            if (formatInputObj.id === allItemsObj.id) {
                const { id, name, price } = allItemsObj;
                const { count } = formatInputObj;
                eachItemInfo.push({ id, name, price, count });
            }
        }
    }
    return eachItemInfo;
}

/**
 * 计算已点菜品优惠前总价
 * @param {已点菜品信息} eachItemInfo 
 */
function calculateOriginalSumPrice(eachItemInfo) {
    let originalSPrice = 0;
    for (let eachItemObj of eachItemInfo) {
        originalSPrice += eachItemObj.count * eachItemObj.price;
    }
    return originalSPrice;
}

/**
 * 计算第1种优惠下所有菜品总价 5 lines
 * @param {已点菜品信息} eachItemInfo 
 * @param {所有优惠方式} promotions 
 * @param {优惠前总价} originalSumPrice 
 */
function calculateDiscSumPrice1(originalSumPrice) {
    let discSumPrice1 = 0;
    if (originalSumPrice >= 30) {
        discSumPrice1 = originalSumPrice - 6;
    }
    return discSumPrice1;
}

/**
 * 计算第2种优惠下所有菜品总价 10 lines
 * @param {已点菜品信息} eachItemInfo 
 * @param {所有优惠方式} promotions 
 * @param {优惠前总价} originalSumPrice 
 */
function calculateDiscSumPrice2(eachItemInfo, promotions, originalSumPrice) {
    let savePrice = 0;
    for (let eachItemObj of eachItemInfo) {
        for (let promotionId of promotions[1].items) {
            if (eachItemObj.id === promotionId) {
                savePrice += eachItemObj.count * (eachItemObj.price / 2);
            }
        }
    }
    let discSumPrice2 = originalSumPrice - savePrice
    return discSumPrice2;
}

/**
 * 获取最佳优惠信息 12 lines
 * @param {优惠1总价} discSumPrice1 
 * @param {优惠2总价} discSumPrice2 
 * @param {优惠方式}  promotions 
 */
function getBestChargeInfo(discSumPrice1, discSumPrice2,promotions) {
    let type = "", bestCharge = 0;
    if(discSumPrice1<discSumPrice2){
        bestCharge = discSumPrice1;
        type = promotions[0].type;
    }else if(discSumPrice1>discSumPrice2){
        bestCharge = discSumPrice2;
        type = promotions[1].type;
    }else{
        bestCharge = discSumPrice1;
    }
    let bestChargeInfo = {type,bestCharge}
    return bestChargeInfo
}


// function returnSummary(eachItemInfo, bestCharge) {
//     let summary = `
// ============= 订餐明细 =============
// 黄焖鸡 x 1 = 18元
// 肉夹馍 x 2 = 12元
// 凉皮 x 1 = 8元
// -----------------------------------
// 使用优惠:
// 指定菜品半价(黄焖鸡，凉皮)，省13元
// -----------------------------------
// 总计：25元
// ===================================`;
//     return summary;
// }

module.exports = {
    bestCharge,
    formatInputs,
    getEachItemInfo,
    calculateOriginalSumPrice,
    calculateDiscSumPrice1,
    calculateDiscSumPrice2,
    getBestChargeInfo
}