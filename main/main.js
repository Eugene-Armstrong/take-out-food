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
    let eachItemInfo = getEachItemInfo(formatInputs, allItemsInfo);
    // 3 计算已点菜品优惠前总价
    // let originalSumPrice = calculateOriginalSumPrice(eachItemInfo);
    // 4-1 计算第1种优惠下所有已点菜品总价
    // let discSumPrice1 = calculateDiscSumPrice1(eachItemInfo,promotions);

    // 4-2 计算第2种优惠下所有已点菜品总价

    // 5 获取最佳优惠总价

    // 6 返回最终汇总信息
    console.info(formattedInputs);
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

module.exports = {
    bestCharge,
    formatInputs
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
 * 
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
 * 计算第1种优惠下所有菜品总价 12 lines
 * @param {已点菜品信息} eachItemInfo 
 * @param {所有优惠方式} promotions 
 */
function calculateDiscSumPrice1(eachItemInfo, promotions) {
    let discSumPrice1 = 0;
    for (let eachItemObj of eachItemInfo) {
        for (let promotionId of promotions[1].items) {
            if (eachItemObj.id === promotionId) {
                discSumPrice1 += eachItemObj.count * (eachItemObj.price/2)
            }
        }
    }
    return discSumPrice1;
}

module.exports = {
    bestCharge,
    formatInputs,
    getEachItemInfo,
    calculateOriginalSumPrice,
    calculateDiscSumPrice1
}