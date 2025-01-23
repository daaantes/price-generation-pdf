import "./styles/main.scss";
import { PDF } from "./pdfGenerator";

import logo from "./assets/logo.jpg";
import inside from "./assets/inside.png";
import outside from "./assets/outside.png";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("date").valueAsDate = new Date();

  document.getElementById("logo-image").src = logo;
  document.getElementById("inside-image").src = inside;
  document.getElementById("outside-image").src = outside;
});

document.getElementById("saveBtn").addEventListener("click", () => {
  const pdfGenerator = new PDF();

  const data = {
    customer: document.getElementById("customer").value,
    car: document.getElementById("car").value,
    plate: document.getElementById("plate").value,

    insideCleaning: {
      partial: {
        checked: document.getElementById("ins-partial-check").checked,
        price: document.getElementById("ins-partial-price").value,
        elements: [
          {
            name: "roof",
            posX: 0,
            posY: 0,
            checked: document.getElementById("ins-roof").checked,
          },
          {
            name: "trunk",
            posX: 0,
            posY: 0,
            checked: document.getElementById("ins-trunk").checked,
          },
          {
            name: "rightRearDoor",
            posX: 0,
            posY: 0,
            checked: document.getElementById("ins-right-rear-door").checked,
          },
          {
            name: "leftRearDoor",
            posX: 0,
            posY: 0,
            checked: document.getElementById("ins-left-rear-door").checked,
          },
          {
            name: "rearSeats",
            posX: 0,
            posY: 0,
            checked: document.getElementById("ins-rear-seats").checked,
          },
          {
            name: "gloveCompartment",
            posX: 0,
            posY: 0,
            checked: document.getElementById("ins-glove-compartment").checked,
          },
          {
            name: "leftFrontSeat",
            posX: 0,
            posY: 0,
            checked: document.getElementById("ins-left-front-seat").checked,
          },
          {
            name: "rightFrontSeat",
            posX: 0,
            posY: 0,
            checked: document.getElementById("ins-right-front-seat").checked,
          },
          {
            name: "rightFrontDoor",
            posX: 0,
            posY: 0,
            checked: document.getElementById("ins-right-front-door").checked,
          },
          {
            name: "leftFrontDoor",
            posX: 0,
            posY: 0,
            checked: document.getElementById("ins-left-front-door").checked,
          },
          {
            name: "dashboard",
            posX: 0,
            posY: 0,
            checked: document.getElementById("ins-dashboard").checked,
          },
          {
            name: "steeringWheel",
            posX: 0,
            posY: 0,
            checked: document.getElementById("ins-steering-wheel").checked,
          },
        ],
      },
      full: {
        checked: document.getElementById("ins-full-check").checked,
        price: document.getElementById("ins-full-price").value,
      },
      fullWithDisassembly: {
        checked: document.getElementById("ins-full-with-disassembly-check")
          .checked,
        price: document.getElementById("ins-full-with-disassembly-price").value,
      },
    },
    leatherConditioner: {
      checked: document.getElementById("leather-conditioner-check").checked,
      price: document.getElementById("leather-conditioner-price").value,
    },
    bitumenCleaning: {
      checked: document.getElementById("bitumen-cleaning-check").checked,
      price: document.getElementById("bitumen-cleaning-price").value,
    },
    outsidePolish: {
      partial: {
        checked: document.getElementById("out-partial-check").checked,
        price: document.getElementById("out-partial-price").value,
        elements: [
          {
            name: "frontBumper",
            posX: 0,
            posY: 0,
            checked: document.getElementById("out-front-bumper").checked,
          },
          {
            name: "hood",
            posX: 0,
            posY: 0,
            checked: document.getElementById("out-hood").checked,
          },
          {
            name: "roof",
            posX: 0,
            posY: 0,
            checked: document.getElementById("out-roof").checked,
          },
          {
            name: "trunk",
            posX: 0,
            posY: 0,
            checked: document.getElementById("out-trunk").checked,
          },
          {
            name: "rearBumper",
            posX: 0,
            posY: 0,
            checked: document.getElementById("out-rear-bumper").checked,
          },
          {
            name: "leftFrontWing",
            posX: 0,
            posY: 0,
            checked: document.getElementById("out-left-front-wing").checked,
          },
          {
            name: "rightFrontWing",
            posX: 0,
            posY: 0,
            checked: document.getElementById("out-right-front-wing").checked,
          },
          {
            name: "leftRearWing",
            posX: 0,
            posY: 0,
            checked: document.getElementById("out-left-rear-wing").checked,
          },
          {
            name: "rightRearWing",
            posX: 0,
            posY: 0,
            checked: document.getElementById("out-right-rear-wing").checked,
          },
          {
            name: "rightRearDoor",
            posX: 0,
            posY: 0,
            checked: document.getElementById("out-right-rear-door").checked,
          },
          {
            name: "rightFrontDoor",
            posX: 0,
            posY: 0,
            checked: document.getElementById("out-right-front-door").checked,
          },
          {
            name: "leftFrontDoor",
            posX: 0,
            posY: 0,
            checked: document.getElementById("out-left-front-door").checked,
          },
          {
            name: "leftRearDoor",
            posX: 0,
            posY: 0,
            checked: document.getElementById("out-left-rear-door").checked,
          },
        ],
      },
      full: {
        checked: document.getElementById("out-full-check").checked,
        price: document.getElementById("out-full-price").value,
      },
    },
    detailsCleaning: {
      checked: document.getElementById("out-elements-check").checked,
      price: document.getElementById("out-elements-price").value,
    },
    decorativeTipCleaning: {
      checked: document.getElementById("out-decorative-tip-check").checked,
      price: document.getElementById("out-decorative-tip-price").value,
    },
    wheelsCleaning: {
      checked: document.getElementById("out-wheels-check").checked,
      price: document.getElementById("out-wheels-price").value,
    },
    underHoodCleaning: {
      checked: document.getElementById("out-under-hood-check").checked,
      price: document.getElementById("out-under-hood-price").value,
    },
    comments: document.getElementById("comments").value,
    date: document.getElementById("date").value,
    manager: document.getElementById("manager").value,
  };

  pdfGenerator.generatePDF(data);
});
