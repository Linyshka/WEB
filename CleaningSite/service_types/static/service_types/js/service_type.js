let maxPercent = +document.querySelector('#max_promocode_percent').textContent;

let serviceTypeCosts = document.querySelectorAll("#cost_with_promocode");
const serviceTypeCommonCosts = document.querySelectorAll("#common_cost");

for (let node of serviceTypeCosts) {
    let serviceCommonCost = node.getAttribute('value');
    let serviceCostWithPromocode = serviceCommonCost * (1 - maxPercent * 0.01);
    node.innerHTML = `Cost with promocode: ${serviceCostWithPromocode}`;
}

serviceTypeCommonCosts.forEach(node => {
    node.style.textDecorationColor = "red";
    node.style.textDecorationStyle = "line-through";
});