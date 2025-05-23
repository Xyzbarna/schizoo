<script setup>
</script>

<template>
  <div class="sd-dc-mark">
    <div class="sd-dc-mark__logo">
      <span class="sd-dc-mark__logo-des">des</span>
      <span class="sd-dc-mark__logo-colo">colo</span>
    </div>

    <div class="sd-dc-mark__ext">
      <span class="sd-dc-mark__ext-dot">.</span>
      <span class="sd-dc-mark__ext-cat">cat</span>
    </div>

    <div class="sd-dc-mark__cat">
      <div class="sd-dc-mark__cat-ears">
        <span class="sd-dc-mark__cat-ears-both">^ ^</span>
      </div>

      <div class="sd-dc-mark__cat-face">
        <span class="sd-dc-mark__cat-face-eye">·</span>
        <span class="sd-dc-mark__cat-face-nose">.</span>
        <span class="sd-dc-mark__cat-face-eye">·</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .sd-dc-mark {
    display: inline-grid;
    grid-template-columns: repeat(2, auto);
    font-family: $font-mono;
    font-size: 3rem;
    line-height: 3rem;
    text-transform: uppercase;
    color: rgba($color-lightest, .75);
    grid-template-areas:
      'logo face'
      'logo ext';

    &__logo {
      grid-area: logo;
      align-self: end;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      font-weight: 700;
      color: rgba($color-main, .75);
    }

    &__ext {
      grid-area: ext;
      color: rgba($color-lightest, .75);
    }

    &__ext-dot {}

    &__ext-cat {
      font-weight: 300;
      text-transform: uppercase;
    }

    &__cat {
      grid-area: face;
      padding-left: 1.8rem;
    }

    &__cat-face {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    &__cat-face-eye {
      color: rgba($color-main, .75)
    }

    &__cat-face-nose {
      font-weight: 700;
      color: rgba($color-lightest, .25)
    }
  }
</style>