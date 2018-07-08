// Write your cade below:
'use strict';

const { loadAllItems } = require('../main/items');
const { loadPromotions } = require('../main/promotions');

const allItemsInfo = loadAllItems();
const promotions = loadPromotions();

function bestCharge(selectedItems) {
    // 1 格式化输入
    let formattedInputs = formatInputs(selectedItems);

    // 2 整合获取已点菜品信息
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
    let summary = `============= 订餐明细 =============\n`;
    for (let eachItemObj of eachItemInfo) {
        let sumEachItem = eachItemObj.price * eachItemObj.count;
        summary += `${eachItemObj.name} x ${eachItemObj.count} = ${sumEachItem}元\n`;
    }
    summary += "-----------------------------------\n" +
        bestChargeInfo.type + "总计：" +
        bestChargeInfo.bestCharge + "元\n===================================";
    return summary;
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
 * 计算已点菜品优惠前总价 5 lines
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
 * 计算第1种优惠下所有菜品总价 7 lines
 * @param {已点菜品信息} eachItemInfo 
 * @param {所有优惠方式} promotions 
 * @param {优惠前总价} originalSumPrice 
 */
function calculateDiscSumPrice1(originalSumPrice) {
    let discSumPrice1 = 0;
    if (originalSumPrice >= 30) {
        discSumPrice1 = originalSumPrice - 6;
    }else{
        discSumPrice1 = originalSumPrice;
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
 * 获取最佳优惠信息 16 lines
 * @param {优惠1总价} discSumPrice1 
 * @param {优惠2总价} discSumPrice2 
 * @param {优惠方式}  promotions 
 */
function getBestChargeInfo(discSumPrice1, discSumPrice2, promotions) {
    let type = "", bestCharge = 0;
    if (discSumPrice1 === discSumPrice2) {
        bestCharge = discSumPrice1;
    } else {
        if (discSumPrice1 < discSumPrice2) {
            bestCharge = discSumPrice1;
            type = "使用优惠:\n" + promotions[0].type +
                "，省6元\n-----------------------------------\n";
        } else {
            bestCharge = discSumPrice2;
            type = "使用优惠:\n" + promotions[1].type +
                "(黄焖鸡，凉皮)，省13元\n-----------------------------------\n";
        }
    }
    let bestChargeInfo = { type, bestCharge };
    return bestChargeInfo;
}

module.exports = {
    bestCharge,
    formatInputs,
    getEachItemInfo,
    calculateOriginalSumPrice,
    calculateDiscSumPrice1,
    calculateDiscSumPrice2,
    getBestChargeInfo
}