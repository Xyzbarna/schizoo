<script setup>
  import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'

  import { useRoute, useRouter } from 'vue-router'
  // Pinia stores
  import { useStWindow } from '@/stores/stWindow.js'
  import { useStHeaderBanner } from '@/stores/stHeaderBanner.js'

  // Components
  import DCMark from '@/components/DCMark.vue'
  import SVGFlashNew from '@/components/SVGs/SVGFlashNew.vue'
  import SVGCircleInfo from '@/components/SVGs/SVGCircleInfo.vue'
  import HeaderMainMenu from './HeaderMainMenu.vue'

  const router = useRouter()
  const route = useRoute()

  const stWindow = useStWindow()
  const stHeaderBanner = useStHeaderBanner()

</script>

<template>
  <div class="sd-header-banner">
    <template v-if="stHeaderBanner.loading">
      LOADING BANNER...
    </template>

    <template v-if="!stHeaderBanner.loading && stHeaderBanner.banner.aCFHeaderBanners.design === 't-shirt'">
      <RouterLink class="sd-header-banner__title sd-button"
        :to="'/'">
        <div class="sd-button__txt">
          {{ stHeaderBanner.banner.title }}
        </div>
      </RouterLink>
      
      <div class="sd-header-banner__prod-name">
        {{ stHeaderBanner.prod.name }}
      </div>

      <div class="sd-header-banner__prod-info sd-button">
        <div class="sd-button__icon sd-button__icon--small">
          <SVGCircleInfo 
            :cssStroke="['main']"
            :cssFill="['main']"/>
        </div>
      </div>

      <button class="sd-header-banner__more sd-button">
        <div class="sd-button__bg-mask">
          <div class="sd-button__bg-color">
            <div class="sd-button__txt">
              SHOW MORE
            </div>

            <div class="sd-button__icon">
              <SVGFlashNew 
                :cssStroke="['warning-full']"
                :cssFill="['warning-full']"/>
            </div>
          </div>
        </div>
      </button>

      <div class="sd-header-banner__prod-pic">
        <div class="sd-header-banner__prod-pic-stripe">
          <div class="sd-header-banner__prod-pic-stripe-bg-mask">
            <div class="sd-header-banner__prod-pic-stripe-bg-color">
            </div>
          </div>
        </div>
        <img
          :src="stHeaderBanner.prodPic.sourceUrl" 
          :alt="stHeaderBanner.prodPic.altText" />
      </div>
    </template>
  </div>
</template>

<style lang="scss">  
  .sd-header-banner {
    grid-area: headerBanner;
    display: grid;
    grid-template-areas: 
      'bannerPic bannerTitle bannerTitle'
      'bannerPic bannerName bannerInfo'
      'bannerPic bannerMore bannerMore';
    grid-template-columns: 9rem 9rem 3rem;

    //9 blocks 432px + 1
    @media (min-width: 433px) {
      grid-template-columns: 12rem 9rem 3rem;
    }

    @media (min-width: 481px) {
      grid-template-columns: 12rem 9rem 3rem;
      margin-left: 3rem;
    }

    @media (min-width: 529px) {
      grid-template-columns: 15rem 9rem 3rem;
    }

    @media (min-width: 577px) {
      grid-template-columns: 15rem 12rem 3rem;
    }

    @media (min-width: 625px) {
      grid-template-columns: 15rem 15rem 3rem;
    }

    @media (min-width: 673px) {
      grid-template-columns: 9rem 9rem 3rem;
      margin: 3rem 0;
    }

    @media (min-width: 769px) {
      grid-template-columns: 12rem 9rem 3rem;
      margin: 3rem 0;
    }

    &__title {
      grid-area: bannerTitle;
      display: grid;
      align-items: center;
      text-transform: uppercase;
      padding-right: .5rem;

      @media (min-width: 433px) {
        font-weight: 200;
        font-size: 2rem;
        line-height: 2rem;
        text-align: right;
        height: 6rem;
        padding-right: 0;
      }

      @media (min-width: 673px) {
        font-weight: 400;
        font-size: 1rem;
        line-height: 1rem;
        text-align: left;
        height: 3rem;
        padding-right: .5rem;
      }
      
      .sd-button {
        &__txt {
          color: rgba($color-warning, 1);
        }
      }
    }

    &__prod-name {
      grid-area: bannerName;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      text-align: right;
      text-transform: uppercase;
      color: rgba($color-main, .7);
      height: 3rem;
      padding: .25rem .5rem;
      background-color: rgba($color-lightest, .02);

      @media (min-width: 625px) {
        margin-left: 3rem;
      }

      @media (min-width: 673px) {
        margin-left: 0;
      }
    }

    &__prod-info {
      grid-area: bannerInfo;
      background-color: rgba($color-lightest, .01);
    }

    &__more {
      position: relative;
      grid-area: bannerMore;
      height: 3rem;

      @media (min-width: 529px) {
        margin-bottom: 3rem;
      }

      @media (min-width: 673px) {
        margin-bottom: 0;
      }

      .sd-button {
        position: relative;

        &__bg-mask {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          height: 3rem;
          background-color: rgba($color-darkest, .98);
        }

        &__bg-color {
          background-color: transparent;
        }

        &__txt {
          position: relative;
          justify-content: flex-end;
          text-align: right;
          color: rgba($color-warning, .7);
          padding: .25rem .5rem;
          background-color: rgba($color-warning, .2);
        }
        &__icon {
          position: relative;
          background-color: rgba($color-warning, .4);
        }
      }
    }

    &__prod-pic {
      position: relative;
      grid-area: bannerPic;
      width: 9rem;
      height: 9rem;

      @media (min-width: 433px) {
        width: 12rem;
        height: 12rem;
      }

      @media (min-width: 529px) {
        width: 15rem;
        height: 15rem;
      }

      @media (min-width: 673px) {
        width: 9rem;
        height: 9rem;
      }

      @media (min-width: 769px) {
        width: 12rem;
        height: 12rem;
      }


      img {
        position: relative;
      }
    }

    &__prod-pic-stripe {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 3rem;

      &-bg-mask {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 3rem;
        background-color: rgba($color-darkest, .98);
      }

      &-bg-color {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 3rem;
        background-color: rgba($color-warning, .2);
      }

      @media (min-width: 529px) {
        bottom: 3rem;
      }

      @media (min-width: 673px) {
        bottom: 0;
      }
    }
  }
</style>