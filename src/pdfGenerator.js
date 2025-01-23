import jsPDF from "jspdf";

import fontNormal from "./assets/fonts/static/Roboto-Regular.ttf";
import fontBold from "./assets/fonts/static/Roboto-Bold.ttf";

import logo from "./assets/logo.jpg";
import inside from "./assets/inside.png";
import outside from "./assets/outside.png";

export class PDF {
  lineHeight;
  gap;

  #doc;
  #pointsPerPx = 1.333;
  #margin = {
    top: 16,
    right: 16,
    bottom: 16,
    left: 16,
  };

  /**
   * @param {*} lineHeight @default 1.15
   * @param {*} gap - like '--rem' css variable @default 16
   */
  constructor(lineHeight = 1.15, gap = 16) {
    this.gap = gap;
    this.lineHeight = lineHeight;

    this.#doc = new jsPDF({
      orientation: "p",
      unit: "px",
      format: "a4",
    }).setProperties({ author: "8 CYLINDERS DETAILING" });

    this.#doc.addFont(fontNormal, "Roboto", "normal", 400, undefined, true);
    this.#doc.addFont(fontBold, "Roboto", "normal", 700);
  }

  generatePDF(data) {
    this.#doc.setProperties({
      title: `${data.car} ${data.plate}`,
    });

    const pageWidth = this.#doc.internal.pageSize.getWidth();
    const pageHeight = this.#doc.internal.pageSize.getHeight();

    let offsetTop = this.#margin.top;
    let offsetBottom = this.#margin.bottom;

    /**
     * HEADER
     */

    const logoWidth = 80;
    const logoHeight = 80;

    this.#doc.setFontSize(16);

    this.#addImage(
      logo,
      pageWidth - this.#margin.right,
      offsetTop + this.gap * 0.25,
      logoWidth,
      logoHeight,
      "before",
      "after"
    );

    this.#addText(
      "Detailing".toUpperCase(),
      pageWidth -
        this.#margin.right -
        logoWidth +
        (logoWidth - this.#doc.getTextWidth("Detailing".toUpperCase())) / 2,
      offsetTop,
      logoWidth,
      16,
      700
    );

    offsetTop += logoHeight;

    this.#addText(
      "Лист осмотра автомобиля".toUpperCase(),
      this.#margin.left,
      offsetTop / 2,
      pageWidth - logoWidth - this.#margin.left - this.#margin.right - this.gap,
      24,
      700
    );

    /**
     * CUSTOMER INFO
     */
    offsetTop +=
      this.gap * 0.5 +
      this.#addTextFormField(
        "Заказчик (контакт тел.)",
        data.customer,
        this.#margin.left,
        offsetTop,
        pageWidth - this.#margin.left - this.#margin.right
      );

    const carPlateWidth = 140;

    const carNameHeight = this.#addTextFormField(
      "Автомобиль",
      data.car,
      this.#margin.left,
      offsetTop,
      pageWidth -
        this.#margin.left -
        this.#margin.right -
        this.gap * 0.5 -
        carPlateWidth
    );

    const carPalteHeight = this.#addTextFormField(
      "Гос. номер",
      data.plate,
      pageWidth - this.#margin.right - carPlateWidth,
      offsetTop,
      carPlateWidth
    );

    offsetTop +=
      this.gap * 0.75 +
      (carNameHeight > carPalteHeight ? carNameHeight : carPalteHeight);

    /**
     * SERVICES LIST PAGE 1
     */
    offsetTop +=
      this.gap * 0.75 +
      this.#addText(
        "Салон автомобиля нуждается в чистке (химчистке):",
        this.#margin.left,
        offsetTop,
        pageWidth - this.#margin.left - this.#margin.right,
        14
      );

    offsetBottom +=
      this.gap * 0.75 +
      this.#addServiceSection(
        "Кузов автомобиля нуждается в чистке от битума и металлических вкраплений.",
        "Рекомендуется после чистки кузова авто защитить ЛКП воском либо защитным агентом.",
        data.bitumenCleaning.checked,
        data.bitumenCleaning.price,
        this.#margin.left,
        pageHeight - offsetBottom,
        pageWidth - this.#margin.left - this.#margin.right,
        true
      );

    offsetBottom +=
      this.gap * 0.75 +
      this.#addServiceSection(
        "Кожаная обивка салона автомобиля (сиденья; карты дверей; руль; ручка АКПП; центральная консоль; торпедо) нуждается в пропитке и защите кондиционером.",
        "Кондиционер наноситстя исключительно на чистые поверхности.",
        data.leatherConditioner.checked,
        data.leatherConditioner.price,
        this.#margin.left,
        pageHeight - offsetBottom,
        pageWidth - this.#margin.left - this.#margin.right,
        true
      );

    const insideImageSize = this.#addImage(
      inside,
      this.#margin.left,
      offsetTop,
      (pageWidth - this.#margin.right - this.#margin.left - this.gap * 0.5) / 2,
      pageHeight - offsetTop - offsetBottom
    );

    data.insideCleaning.partial.elements.forEach((el) => {
      const checkBoxWidth = 12;
      const { posX, posY } = el;

      this.#doc.setLineWidth(0.5);

      this.#doc.roundedRect(
        this.#margin.left + posX,
        offsetTop + posY,
        checkBoxWidth,
        checkBoxWidth,
        4,
        4,
        "S"
      );

      if (el.checked) {
        this.#doc
          .setFillColor("#000000")
          .roundedRect(
            this.#margin.left + posX + (checkBoxWidth * 0.5) / 4,
            offsetTop + posY + (checkBoxWidth * 0.5) / 4,
            checkBoxWidth * 0.75,
            checkBoxWidth * 0.75,
            2,
            2,
            "F"
          );
      }
    });

    let descriptionOffsetTop = 0;
    descriptionOffsetTop +=
      this.gap * 0.75 +
      this.#addText(
        "Рекомендуется чистить автомобильную обивку не реже двух раз в год.",
        (pageWidth + this.gap * 0.5) / 2,
        offsetTop + insideImageSize.height,
        (pageWidth - this.#margin.right - this.#margin.left - this.gap * 0.5) /
          2,
        12,
        undefined,
        undefined,
        "before"
      );

    this.gap * 0.25 +
      this.#addText(
        "Для кожаных поверхностей после чистки (химчистки) рекомендуется пропитать их защитным составом, кондиционером либо кварцевым покрытием.",
        (pageWidth + this.gap * 0.5) / 2,
        offsetTop + insideImageSize.height - descriptionOffsetTop,
        (pageWidth - this.#margin.right - this.#margin.left - this.gap * 0.5) /
          2,
        12,
        undefined,
        undefined,
        "before"
      );

    offsetTop +=
      this.gap * 0.75 +
      this.#addServiceSection(
        "частичной",
        "(элементы требющие уход обозначены на картинке)",
        data.insideCleaning.partial.checked,
        data.insideCleaning.partial.price,
        (pageWidth + this.gap * 0.5) / 2,
        offsetTop,
        (pageWidth - this.#margin.right - this.#margin.left - this.gap * 0.5) /
          2
      );

    offsetTop +=
      this.gap * 0.75 +
      this.#addServiceSection(
        "полной",
        "без разборки салона",
        data.insideCleaning.full.checked,
        data.insideCleaning.full.price,
        (pageWidth + this.gap * 0.5) / 2,
        offsetTop,
        (pageWidth - this.#margin.right - this.#margin.left - this.gap * 0.5) /
          2
      );

    offsetTop +=
      this.gap * 0.75 +
      this.#addServiceSection(
        "полной",
        "с частичным разбором салона",
        data.insideCleaning.fullWithDisassembly.checked,
        data.insideCleaning.fullWithDisassembly.price,
        (pageWidth + this.gap * 0.5) / 2,
        offsetTop,
        (pageWidth - this.#margin.right - this.#margin.left - this.gap * 0.5) /
          2
      );

    /**
     * SERVICES LIST PAGE 2
     */
    this.#doc.addPage();

    offsetTop = this.#margin.top;
    offsetBottom = this.#margin.bottom;

    offsetTop +=
      this.gap * 0.75 +
      this.#addText(
        "Кузов автомобиля нуждается в полировке:",
        this.#margin.left,
        offsetTop,
        pageWidth - this.#margin.left - this.#margin.right,
        14
      );

    const dateHeight = this.#addTextFormField(
      "Дата",
      data.date,
      this.#margin.left,
      pageHeight - offsetBottom,
      (pageWidth - this.#margin.left - this.#margin.right - this.gap * 0.5) / 2,
      true
    );

    const managerNameHeight = this.#addTextFormField(
      "Менеджер",
      data.manager,
      this.#margin.left +
        this.gap * 0.5 +
        (pageWidth - this.#margin.left - this.#margin.right - this.gap * 0.5) /
          2,
      pageHeight - offsetBottom,
      (pageWidth - this.#margin.left - this.#margin.right - this.gap * 0.5) / 2,
      true
    );

    offsetBottom +=
      dateHeight > managerNameHeight ? dateHeight : managerNameHeight;

    offsetBottom +=
      this.gap * 0.75 +
      this.#addText(
        data.comments,
        this.#margin.left,
        pageHeight - offsetBottom,
        pageWidth - this.#margin.left - this.#margin.right,
        12,
        undefined,
        undefined,
        "before"
      );

    offsetBottom +=
      this.gap * 0.75 +
      this.#addServiceSection(
        "Подкапотное пространство (мотор) нуждается в мойке.",
        "Рекомендуется мыть подкапотное пространство один раз в год.",
        data.underHoodCleaning.checked,
        data.underHoodCleaning.price,
        this.#margin.left,
        pageHeight - offsetBottom,
        pageWidth - this.#margin.left - this.#margin.right,
        true
      );

    offsetBottom +=
      this.gap * 0.75 +
      this.#addServiceSection(
        "Диски автомобиля нуждаются в чистке.",
        "(чистка производится безкислотным очистителем)",
        data.wheelsCleaning.checked,
        data.wheelsCleaning.price,
        this.#margin.left,
        pageHeight - offsetBottom,
        pageWidth - this.#margin.left - this.#margin.right,
        true
      );

    offsetBottom +=
      this.gap * 0.75 +
      this.#addServiceSection(
        "Декоративная насадка на выхлопной системе нуждается в чистке.",
        undefined,
        data.decorativeTipCleaning.checked,
        data.decorativeTipCleaning.price,
        this.#margin.left,
        pageHeight - offsetBottom,
        pageWidth - this.#margin.left - this.#margin.right,
        true
      );

    offsetBottom +=
      this.gap * 0.75 +
      this.#addServiceSection(
        "Хромированные (алюминиевые) декоративные элементы автомобиля нуждаются в чистке.",
        undefined,
        data.detailsCleaning.checked,
        data.detailsCleaning.price,
        this.#margin.left,
        pageHeight - offsetBottom,
        pageWidth - this.#margin.left - this.#margin.right,
        true
      );

    const outsideImageSize = this.#addImage(
      outside,
      this.#margin.left,
      offsetTop,
      (pageWidth - this.#margin.right - this.#margin.left - this.gap * 0.5) / 2,
      pageHeight - offsetTop - offsetBottom
    );

    data.outsidePolish.partial.elements.forEach((el) => {
      const checkBoxWidth = 12;
      const { posX, posY } = el;

      this.#doc.setLineWidth(0.5);

      this.#doc.roundedRect(
        this.#margin.left + posX,
        offsetTop + posY,
        checkBoxWidth,
        checkBoxWidth,
        4,
        4,
        "S"
      );

      if (el.checked) {
        this.#doc
          .setFillColor("#000000")
          .roundedRect(
            this.#margin.left + posX + (checkBoxWidth * 0.5) / 4,
            offsetTop + posY + (checkBoxWidth * 0.5) / 4,
            checkBoxWidth * 0.75,
            checkBoxWidth * 0.75,
            2,
            2,
            "F"
          );
      }
    });

    this.#addText(
      "Рекомендуется после полировки кузова защитить ЛКП автомобиля: воском, защитным агентом, кварцевым покрытием.",
      (pageWidth + this.gap * 0.5) / 2,
      offsetTop + outsideImageSize.height,
      (pageWidth - this.#margin.right - this.#margin.left - this.gap * 0.5) / 2,
      12,
      undefined,
      undefined,
      "before"
    );

    offsetTop +=
      this.gap * 0.75 +
      this.#addServiceSection(
        "частичной",
        "(элементы требющие уход обозначены на картинке)",
        data.outsidePolish.partial.checked,
        data.outsidePolish.partial.price,
        (pageWidth + this.gap * 0.5) / 2,
        offsetTop,
        (pageWidth - this.#margin.right - this.#margin.left - this.gap * 0.5) /
          2
      );

    offsetTop +=
      this.gap * 0.75 +
      this.#addServiceSection(
        "полной",
        undefined,
        data.outsidePolish.full.checked,
        data.outsidePolish.full.price,
        (pageWidth + this.gap * 0.5) / 2,
        offsetTop,
        (pageWidth - this.#margin.right - this.#margin.left - this.gap * 0.5) /
          2
      );

    this.#doc.save(`${data.car} ${data.plate} - ${data.date}.pdf`);
  }

  #addText(
    text,
    offsetX,
    offsetY,
    maxWidth,
    fontSize,
    fontWeight = 400,
    textAlign = "left",
    positionY = "after"
  ) {
    const textLines = this.#doc
      .setFont("Roboto", "normal", fontWeight)
      .setFontSize(fontSize)
      .setTextColor("#000000")
      .splitTextToSize(text, maxWidth);
    const textHeight = this.#getTextHeight(textLines.length, fontSize);

    if (positionY === "before") {
      offsetY -= textHeight;
    }

    this.#doc.text(textLines, offsetX, offsetY, {
      align: textAlign,
      baseline: "top",
    });

    return textHeight;
  }

  #addImage(
    image,
    offsetX,
    offsetY,
    maxWidth,
    maxHeight,
    positionX = "after",
    positionY = "after"
  ) {
    const imageProps = this.#doc.getImageProperties(image);

    const scale = Math.min(
      maxWidth / imageProps.width,
      maxHeight / imageProps.height
    );
    const drawWidth = imageProps.width * scale;
    const drawHeight = imageProps.height * scale;

    if (positionX === "before") {
      offsetX -= drawWidth;
    }

    if (positionX === "center") {
      offsetX += (maxWidth - drawWidth) / 2;
    }

    offsetY = positionY === "before" ? offsetY - drawHeight : offsetY;

    this.#doc.addImage({
      imageData: image,
      x: offsetX,
      y: offsetY,
      width: drawWidth,
      height: drawHeight,
    });

    return {
      width: drawWidth,
      height: drawHeight,
    };
  }

  #addServiceSection(
    name,
    description,
    checked,
    price,
    offsetX,
    offsetY,
    maxWidth,
    reverse = false
  ) {
    const checkBoxWidth = 20;
    const currencyWidth = 17;
    const priceWidth = 45;
    let serviceSectionHeight = 0;

    if (reverse) {
      if (description) {
        serviceSectionHeight -= this.#addText(
          description,
          offsetX,
          offsetY,
          maxWidth -
            this.gap * 1.5 -
            checkBoxWidth -
            priceWidth -
            currencyWidth,
          12,
          undefined,
          undefined,
          "before"
        );

        serviceSectionHeight -= this.gap * 0.25;
      }

      serviceSectionHeight -= this.#addText(
        name,
        offsetX,
        offsetY + serviceSectionHeight,
        maxWidth - this.gap * 1.5 - checkBoxWidth - priceWidth - currencyWidth,
        14,
        undefined,
        undefined,
        "before"
      );

      serviceSectionHeight = Math.abs(serviceSectionHeight);
    } else {
      serviceSectionHeight += this.#addText(
        name,
        offsetX,
        offsetY,
        maxWidth - this.gap * 1.5 - checkBoxWidth - priceWidth - currencyWidth,
        14
      );

      if (description) {
        serviceSectionHeight += this.gap * 0.25;
        serviceSectionHeight += this.#addText(
          description,
          offsetX,
          offsetY + serviceSectionHeight,
          maxWidth -
            this.gap * 1.5 -
            checkBoxWidth -
            priceWidth -
            currencyWidth,
          12
        );
      }
    }

    if (reverse) {
      offsetY -= serviceSectionHeight;
    }

    this.#addText(
      "грн",
      offsetX + maxWidth - currencyWidth,
      offsetY + checkBoxWidth,
      currencyWidth,
      14,
      400,
      undefined,
      "before"
    );

    this.#addText(
      price,
      offsetX + maxWidth - priceWidth - this.gap * 0.5 - currencyWidth,
      offsetY + checkBoxWidth,
      priceWidth,
      14,
      400,
      undefined,
      "before"
    );

    this.#doc.setLineWidth(0.5);
    this.#doc.line(
      offsetX + maxWidth - priceWidth - this.gap * 0.5 - currencyWidth,
      offsetY + checkBoxWidth,
      offsetX + maxWidth - this.gap * 0.5 - currencyWidth,
      offsetY + checkBoxWidth
    );

    this.#doc.roundedRect(
      offsetX +
        maxWidth -
        checkBoxWidth -
        priceWidth -
        this.gap -
        currencyWidth,
      offsetY,
      checkBoxWidth,
      checkBoxWidth,
      4,
      4,
      "S"
    );

    if (checked) {
      this.#doc
        .setFillColor("#000000")
        .roundedRect(
          offsetX +
            maxWidth -
            checkBoxWidth -
            priceWidth -
            this.gap -
            currencyWidth +
            (checkBoxWidth * 0.5) / 4,
          offsetY + (checkBoxWidth * 0.5) / 4,
          checkBoxWidth * 0.75,
          checkBoxWidth * 0.75,
          2,
          2,
          "F"
        );
    }

    return checkBoxWidth > serviceSectionHeight
      ? checkBoxWidth
      : serviceSectionHeight;
  }

  #addTextFormField(label, value, offsetX, offsetY, maxWidth, reverse = false) {
    label = `${label.trim()}:`;

    this.#addText(
      label,
      offsetX,
      offsetY,
      maxWidth,
      12,
      undefined,
      undefined,
      reverse ? "before" : "after"
    );

    const gap = this.gap * 0.25;
    const labelWidth = this.#doc.getTextWidth(label) + gap;

    const textHeight = this.#addText(
      value,
      offsetX + labelWidth + gap,
      offsetY,
      maxWidth - labelWidth - gap,
      12,
      undefined,
      undefined,
      reverse ? "before" : "after"
    );

    const lineOffsetTop = reverse ? offsetY : offsetY + textHeight;

    this.#doc.setLineWidth(0.5);
    this.#doc.line(
      offsetX + labelWidth,
      lineOffsetTop,
      offsetX + maxWidth,
      lineOffsetTop
    );

    return textHeight;
  }

  #getTextHeight(lines, fontSize) {
    return (lines * fontSize * this.lineHeight) / this.#pointsPerPx;
  }
}
