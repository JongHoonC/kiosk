const menuList = [
  { name: "돌체라떼", price: 5600, id: "menu1" },
  { name: "돌체 콜드 브루", price: 5800, id: "menu2" },
  { name: "딸기 딜라이트 요거트 블렌디드", price: 6100, id: "menu3" },
  { name: "아메리카노", price: 5600, id: "menu4" },
  { name: "에스프레소", price: 4000, id: "menu5" },
  { name: "자몽 허니 블랙 티", price: 5300, id: "menu6" },
  { name: "자바 칩 프라푸치노", price: 6300, id: "menu7" },
  { name: "카라멜 마끼아또", price: 5600, id: "menu8" },
  { name: "카페 라떼", price: 5000, id: "menu9" },
];
let orderList = [];

let teaNameI;
let quantityNumI;
let orderQuantity = [];
let isfalse = "false";
function order() {
  isfalse = "true";
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const orderItem = document.getElementById("orderItem");
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      menuList.forEach((menuList) => {
        if (checkbox.id == menuList.id) {
          const objMenuList = Object.assign(menuList); //체크된 메뉴의 키 값을 선언
          let objTr = document.createElement("tr");
          objTr.setAttribute("class", "abc");
          orderItem.appendChild(objTr);
          //메뉴 이름
          let objNameTD = document.createElement("td");
          objTr.appendChild(objNameTD);
          objNameTD.setAttribute("class", "teaName");
          objNameTD.textContent = objMenuList.name; // 메뉴 이름 추가
          //수량
          let objCountTD = document.createElement("td");
          objCountTD.setAttribute("class", "count");
          objTr.appendChild(objCountTD);
          let countValue = 1;
          const minBtn = document.createElement("button");
          const countText = document.createElement("span");
          let count = document.querySelectorAll(".count");
          const plusBtn = document.createElement("button");
          let minButton;
          let plusButton;
          for (let i = 0; i < count.length; i++) {
            // 빼기 버튼
            minBtn.innerText = "-";
            minBtn.setAttribute("class", `minBtn${i}`);
            count[i].appendChild(minBtn);
            minButton = document.querySelector(`.minBtn${i}`);

            // 숫자 부분
            countText.innerText = countValue;
            countText.setAttribute("class", `countText`);
            count[i].appendChild(countText);

            //더하기 버튼
            plusBtn.innerText = "+";
            plusBtn.setAttribute("class", `plusBtn${i}`);
            count[i].appendChild(plusBtn);
            plusButton = document.querySelector(`.plusBtn${i}`);
          }
          minButton.addEventListener("click", () => {
            if (countValue > 1) {
              countValue--;
              countText.innerText = countValue;
              updatePrice();

              setPlus();
            }
          });
          plusButton.addEventListener("click", () => {
            countValue++;
            countText.innerText = countValue;
            updatePrice();
            setPlus();
          });

          //가격
          let objPriceTD = document.createElement("td");
          objTr.appendChild(objPriceTD);
          objPriceTD.setAttribute("class", "orderPrice");
          objPriceTD.textContent = objMenuList.price; // 메뉴 가격 추가
          function updatePrice() {
            objPriceTD.textContent = objMenuList.price * countValue;
          }

          //삭제
          let objDeleteTD = document.createElement("td");
          objDeleteTD.setAttribute("class", "deleteBtn");
          objTr.appendChild(objDeleteTD);
          const Delete = document.querySelectorAll(".deleteBtn");
          let deleteBtn = document.createElement("button");
          for (let i = 0; i < Delete.length; i++) {
            Delete[i].appendChild(deleteBtn);
            deleteBtn.innerText = "삭제";
            // 클릭한 요소의 부모의 부모인 tr을 없애기
            deleteBtn.addEventListener("click", () => {
              let clickTarget = deleteBtn.parentNode.parentNode;
              clickTarget.remove();
            });
          }
          const teaName = document.querySelectorAll(".teaName");
          for (let i = 0; i < teaName.length; i++) {
            teaNameI = teaName[i].innerText;
          }
          orderList.push(teaNameI);
        }
      });
    }
  });
  clearCheck();
  // 주문추가 버튼을 누른 후 변한 isfalse 값을 반환
  return isfalse;
}

function setPlus() {
  const resultPrice = document.getElementById("resultPrice");
  const orderPrice = document.querySelectorAll(".orderPrice");
  const orderCount = document.querySelectorAll(".countText");
  let resultPriceNum = 0;
  for (let k = 0; k < orderCount.length; k++) {
    const productPrice = Number(orderPrice[k].innerText);
    resultPriceNum += productPrice;
  }
  resultPrice.innerText = resultPriceNum + " 원";
}
function setMinus() {
  const resultPrice = document.getElementById("resultPrice");
  const orderPrice = document.querySelectorAll(".orderPrice");
  const orderCount = document.querySelectorAll(".countText");
  let resultPriceNum = 0;
  for (let k = 0; k < orderCount.length; k++) {
    const productPrice = Number(orderPrice[k].innerText);
    resultPriceNum += productPrice;
  }
  resultPrice.innerText = resultPriceNum + " 원";
}

function clearCheck() {
  const clearCheck = document.querySelectorAll(".clearCheckBox");
  for (let i = 0; i < clearCheck.length; i++) {
    clearCheck[i].checked = false;
  }
}
function reloadBtn() {
  location.reload();
}
function getOrderList() {
  if (isfalse == order()) {
    const quantityText = document.querySelectorAll(".countText");
    for (let i = 0; i < quantityText.length; i++) {
      quantityNumI = quantityText[i].innerText;
      orderQuantity.push(quantityNumI);
    }
  }
  const result = orderList.reduce((acc, curr, idx) => {
    acc[curr] = orderQuantity[idx];
    return acc;
  }, new Object());
  console.log(result);

  const clearAll = document.querySelectorAll(".abc");
  clearAll.forEach((clearAll) => {
    clearAll.remove();
  });
  const rP = document.getElementById("resultPrice");
  rP.innerText = "0 원";
}
