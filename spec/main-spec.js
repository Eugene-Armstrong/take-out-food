const {
    bestCharge,
    formatInputs,
    getEachItemInfo,
    calculateOriginalSumPrice,
    calculateDiscSumPrice1
} = require('../main/main');
const {loadAllItems} = require('../main/items');
const {loadPromotions} = require('../main/promotions');

// describe('Take out food', function () {

//   it('should generate best charge when best is 指定菜品半价', function () {
//     let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
//     let summary = bestCharge(inputs).trim();
//     let expected = `
// ============= 订餐明细 =============
// 黄焖鸡 x 1 = 18元
// 肉夹馍 x 2 = 12元
// 凉皮 x 1 = 8元
// -----------------------------------
// 使用优惠:
// 指定菜品半价(黄焖鸡，凉皮)，省13元
// -----------------------------------
// 总计：25元
// ===================================`.trim()
//     expect(summary).toEqual(expected)
//   });

//   it('should generate best charge when best is 满30减6元', function () {
//     let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
//     let summary = bestCharge(inputs).trim();
//     let expected = `
// ============= 订餐明细 =============
// 肉夹馍 x 4 = 24元
// 凉皮 x 1 = 8元
// -----------------------------------
// 使用优惠:
// 满30减6元，省6元
// -----------------------------------
// 总计：26元
// ===================================`.trim()
//     expect(summary).toEqual(expected)
//   });

//   it('should generate best charge when no promotion can be used', function () {
//     let inputs = ["ITEM0013 x 4"];
//     let summary = bestCharge(inputs).trim();
//     let expected = `
// ============= 订餐明细 =============
// 肉夹馍 x 4 = 24元
// -----------------------------------
// 总计：24元
// ===================================`.trim()
//     expect(summary).toEqual(expected)
//   });

// });

describe('Unit test', () => {
    it('1 - Format the inputs', () => {
        let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
        const actualResult = JSON.stringify(formatInputs(inputs));
        const expectResult = JSON.stringify([
            { id: 'ITEM0001', count: 1 },
            { id: 'ITEM0013', count: 2 },
            { id: 'ITEM0022', count: 1 },
        ]);
        expect(expectResult).toBe(actualResult);
    });
});

describe('Unit test', () => {
    it('2 - Compare and get the information of selected items', () => {
        let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
        let formattedInputs = formatInputs(inputs);
        const allItemsInfo = loadAllItems(); // 所有菜品信息
        const actualResult = JSON.stringify(getEachItemInfo(formattedInputs, allItemsInfo));
        const expectResult = JSON.stringify([
            { id: 'ITEM0001', name: '黄焖鸡', price: 18.00, count: 1 },
            { id: 'ITEM0013', name: '肉夹馍', price: 6.00, count: 2 },
            { id: 'ITEM0022', name: '凉皮', price: 8.00, count: 1 },
        ]);
        expect(expectResult).toBe(actualResult);
    });
});

describe('Unit test', () => {
    it('3 - Calculate original sum price of the selected items', () => {
        let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
        let formattedInputs = formatInputs(inputs);
        const allItemsInfo = loadAllItems(); // 所有菜品信息
        let eachItemInfo = getEachItemInfo(formattedInputs, allItemsInfo);
        const actualResult = calculateOriginalSumPrice(eachItemInfo);
        const expectResult = 38.00;
        expect(expectResult).toBe(actualResult);
    });
});