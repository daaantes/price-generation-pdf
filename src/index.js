import "./styles/main.scss";
import { PDF } from "./pdfGenerator";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("date").valueAsDate = new Date();
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
        elements: {
          roof: document.getElementById("ins-roof").checked,
          trunk: document.getElementById("ins-trunk").checked,
          rightRearDoor: document.getElementById("ins-right-rear-door").checked,
          leftRearDoor: document.getElementById("ins-left-rear-door").checked,
          rearSeats: document.getElementById("ins-rear-seats").checked,
          gloveCompartment: document.getElementById("ins-glove-compartment")
            .checked,
          leftFrontSeat: document.getElementById("ins-left-front-seat").checked,
          rightFrontSeat: document.getElementById("ins-right-front-seat")
            .checked,
          rightFrontDoor: document.getElementById("ins-right-front-door")
            .checked,
          leftFrontDoor: document.getElementById("ins-left-front-door").checked,
          dashboard: document.getElementById("ins-dashboard").checked,
          steeringWheel: document.getElementById("ins-steering-wheel").checked,
        },
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
        elements: {
          frontBumper: document.getElementById("out-front-bumper").checked,
          hood: document.getElementById("out-hood").checked,
          roof: document.getElementById("out-roof").checked,
          trunk: document.getElementById("out-trunk").checked,
          rearBumper: document.getElementById("out-rear-bumper").checked,
          leftFrontWing: document.getElementById("out-left-front-wing").checked,
          rightFrontWing: document.getElementById("out-right-front-wing")
            .checked,
          leftRearWing: document.getElementById("out-left-rear-wing").checked,
          rightRearWing: document.getElementById("out-right-rear-wing").checked,
          rightRearDoor: document.getElementById("out-right-rear-door").checked,
          rightFrontDoor: document.getElementById("out-right-front-door")
            .checked,
          leftFrontDoor: document.getElementById("out-left-front-door").checked,
          leftRearDoor: document.getElementById("out-left-rear-door").checked,
        },
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
