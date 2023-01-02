<script setup lang="ts">
import { ref } from "vue";
import { sha256 } from "js-sha256";
import { CopyOutlined } from "@ant-design/icons-vue";

import Clipboard from "clipboard";
new Clipboard("#copy");

const usage = ref("");
const length = ref(16);
const result = ref("");

const DIGIT = "0123456789";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const SYMBOL = "!@#$%~&*";
const DIGIT_LEGACY = DIGIT + LOWER + UPPER;
const DIGIT_MODERN = DIGIT_LEGACY + SYMBOL;

function convert(hash: string, digit: string) {
  let number = eval(`0x${hash}n`);
  let length = eval(`${digit.length}n`);
  let buffer = [];
  while (number >= length) {
    let remain = number % length;
    number = number / length;
    buffer.push(digit[remain]);
  }
  buffer.push(digit[number]);
  return buffer.reverse().join("");
}

function generateLegacy() {
  let hash = sha256(usage.value);
  result.value = convert(hash, DIGIT_LEGACY).slice(0, length.value);
}

function generateModern() {
  let hash = sha256(usage.value);
  let temp = convert(hash, DIGIT_MODERN).slice(0, length.value);

  let countLimit = Math.floor(length.value / 4);

  let countSymbol = temp.replace(/\w/g, "").length;
  for (let i = countSymbol - countLimit; i > 0; i--) {
    temp = temp.replace(/\W/, DIGIT[(countSymbol - countLimit) % DIGIT.length]);
  }
  for (let i = countLimit - countSymbol; i > 0; i--) {
    temp = temp.replace(
      /\w/,
      SYMBOL[(countLimit - countSymbol) % SYMBOL.length]
    );
  }

  let countDigit = temp.replace(/\D/g, "").length;
  for (let i = countDigit - countLimit; i > 0; i--) {
    temp = temp.replace(/\d/, LOWER[(countDigit - countLimit) % LOWER.length]);
  }
  for (let i = countLimit - countDigit; i > 0; i--) {
    temp = temp.replace(
      /[a-zA-Z]/,
      DIGIT[(countLimit - countDigit) % DIGIT.length]
    );
  }

  let countLower = temp.replace(/[^a-z]/g, "").length;
  for (let i = countLower - countLimit; i > 0; i--) {
    temp = temp.replace(
      /[a-z]/,
      UPPER[(countLower - countLimit) % UPPER.length]
    );
  }
  for (let i = countLimit - countLower; i > 0; i--) {
    temp = temp.replace(
      /[A-Z]/,
      LOWER[(countLimit - countLower) % LOWER.length]
    );
  }

  result.value = temp;
}

function handleEnter() {
  if (result.value.length == 0) {
    generateModern();
    return;
  }
  let copy = document.querySelector("#copy") as HTMLElement;
  if (copy != null) copy.click();
}
</script>

<template>
  <a-row
    type="flex"
    justify="center"
    :align="'middle'"
    style="min-height: 100vh; background-color: aliceblue"
  >
    <a-col :md="6">
      <a-card>
        <a-space direction="vertical" size="large" style="width: 100%">
          <a-input
            addon-before="用途"
            v-model:value="usage"
            placeholder="example.com"
            @change="result = ''"
            @pressEnter="handleEnter"
            autofocus
          ></a-input>
          <a-input
            addon-before="长度"
            v-model:value="length"
            @pressEnter="handleEnter"
          ></a-input>
          <a-button @click="generateModern" type="primary" block>生成</a-button>
          <a-button @click="generateLegacy" block>生成（兼容模式）</a-button>
          <a-input addon-before="结果" v-model:value="result" id="result">
            <template #addonAfter>
              <copy-outlined
                id="copy"
                role="button"
                data-clipboard-target="#result"
              />
            </template>
          </a-input>
          <a-row type="flex" justify="end">
            <a-col>
              <a href="https://github.com/OrdosX/password-manager">
                Github Repo
              </a>
            </a-col>
          </a-row>
        </a-space>
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped></style>
