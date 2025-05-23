<script setup>
  import { 
    computed,
    nextTick,
    onBeforeMount, 
    onBeforeUpdate,
    onBeforeUnmount, 
    onMounted,
    onUpdated,
    onUnmounted,
    ref, 
    reactive, 
    watch,
  } from 'vue'

  import { useRouter, RouterLink } from 'vue-router'
  import { useTitle } from '@vueuse/core'

  import markdownit from 'markdown-it'

  // helpers
  import { standarizeWidthFromRef } from '@/assets/helpers.js'

  import MarkSchizoo from '@/components/SVGs/MarkSchizoo.vue'
  import ButtonComp from '@/components/buttons/ButtonComp.vue'
  import ButtonIcon from '@/components/buttons/ButtonIcon.vue'
  import SectionFormAuth from '@/components/sections/SectionFormAuth.vue'
  import SectionMenuFull from '@/components/sections/SectionMenuFull.vue'
  import TextBlock from '@/components/TextBlock.vue'

  import SVGCircleButton from '@/components/SVGs/SVGCircleButton.vue'
  import SVGCircleCross from '@/components/SVGs/SVGCircleCross.vue'
  import SVGCircleCheck from '@/components/SVGs/SVGCircleCheck.vue'


  // Pinia stores
  import { useStWindow } from '@/stores/stWindow.js'
  import { useStAuth } from '@/stores/stAuth.js'
  import { useStContact } from '@/stores/stContact'
  import { useStUser } from '@/stores/stUser'
  import { useStLegal } from '@/stores/stLegal'
  import { useStBlog } from '@/stores/stBlog'

  const router = useRouter()

  // init stores
  const stWindow = useStWindow()
  const stAuth = useStAuth()
  const stContact = useStContact()
  const stUser = useStUser()
  const stLegal = useStLegal()
  const stBlog = useStBlog()

  useTitle(`schizoo.com // BLOG`)

  const thumbnail = (sizes) => {
    let pic = sizes.find(size => size.sourceUrl.slice(-8) === 'x480.jpg')
    return pic?.sourceUrl
  }

  const goToRoute = (routeName) => {
    stWindow.menuMain.isOpen = false
    console.log(routeName)

    router.push(`/blog/${routeName}`)
  }
</script>

<template>
  <main class="sd-view">
    <header class="sd-header-main">
      <TextBlock :text="'blog'" :type="'title'" />
    </header>

    <section class="sd-section sd-section-blog">
      <div v-if="stBlog.loading">
        Loading...
      </div>

      <div class="sd-post-card-pic-thumb-list"
        v-if="!stBlog.loading">
        <div class="sd-post-card-pic-thumb"
          v-for="post in stBlog.result.posts.nodes"
          @click="goToRoute(post.slug)"
          :key="post.id">
          <img class="sd-post-card-pic-thumb__pic"
            :src="thumbnail(post.featuredImage.node.mediaDetails.sizes)" 
            :alt="post.featuredImage.node.altText">
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
  .sd-post-card-pic-thumb-list {
    display: grid;
    grid-template-columns: repeat(3, 6rem);
    padding-left: 3rem;

    @media (min-width: 435px) {
      grid-template-columns: repeat(4, 6rem);
    }

    @media (min-width: 529px) {
      grid-template-columns: repeat(3, 9rem);
    }

    @media (min-width: 673px) {
      grid-template-columns: repeat(4, 9rem);
    }

    @media (min-width: 817px) {
      grid-template-columns: repeat(5, 9rem);
    }

    @media (min-width: 961px) {
      grid-template-columns: repeat(6, 9rem);
    }
  }
  .sd-post-card-pic-thumb {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba($color-schizoo, .75);
      mix-blend-mode: normal;
      pointer-events: none;
      transition: all .2s;
    }

    &:hover {
      &::before {
        background-color: rgba($color-schizoo, .25);
      }
    }

    &:active {
      &::before {
        background-color: transparent;
      }
    }

    &__pic {
      width: 6rem;
      height: 6rem;

      @media (min-width: 529px) {
        width: 9rem;
        height: 9rem;
      }
    }
  }
</style>