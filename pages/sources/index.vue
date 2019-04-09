<template>
  <div class="page">
    <div class="container w-100">
      <table class="table is-fullwidth article-list is-hoverable">
        <thead>
          <tr>
            <td>
              <b>Source</b>
            </td>
            <td>
              <b>Status</b>
            </td>
            <td>
              <b>Last Insert</b>
            </td>
            <td>
              <b>Last Update</b>
            </td>
            <td>
              <b>Articles</b>
            </td>
          </tr>
        </thead>
        <transition-group tag="tbody" name="list">
          <tr v-for="source in sources" :key="source._id">
            <th class="article-item">
              <div class="is-flex items-center">
                <span :title="source.healthStatus">
                  <Icon
                    :class="domainHealth(source.healthStatus)"
                    :icon="'checkbox-blank-circle'"
                  />
                </span>
                <nuxt-link
                  :to="{
                    name: 'sources-domain',
                    params: { domain: source.domain }
                  }"
                  :class="'highlighted link red'"
                >
                  {{ source.domain }}
                </nuxt-link>
              </div>
              <small class="inline-block">
                <a
                  :href="source.url"
                  target="_blank"
                  class="highlighted link blue is-flex items-center"
                >
                  (feed {{ source._id }} <Icon :icon="'open-in-new'" />)
                </a>
              </small>
            </th>
            <td>{{ source.errorMessage }}</td>
            <td>{{ publishDate(source.lastArticleInsert) }}</td>
            <td>{{ publishDate(source.systemUpdateDate) }}</td>
            <td>{{ source.articles }}</td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Sources',
  layout: 'wallLayout',
  data() {
    return {
      sources: [],
      interval: null,
      listOptions: {
        sortField: 'articlePublishDate',
        sortOrder: -1,
        limit: 25
      }
    }
  },
  mounted() {
    this.$store.dispatch('setDialogState', false)
    this.$store.commit('setDashboardActions', false)
    this.$store.commit('setShowOrderAction', false)

    this.loadSources()

    this.interval = setInterval(() => {
      this.loadSources()
    }, 5000)

    this.$store.commit('setBreadcrumbs', [
      {
        label: 'News Sources',
        name: 'sources',
        active: true
      }
    ])
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    publishDate(date) {
      console.log(date === null)
      if (typeof date !== 'undefined' && date !== null) {
        return moment(date).from(moment())
      } else {
        return '--'
      }
    },
    domainHealth(health) {
      let className
      switch (health) {
        case 'running':
          className = 'is-running'
          break

        case 'unstable':
          className = 'has-text-danger'
          break

        case 'idle':
          className = 'has-text-grey'
          break

        default:
          className = 'has-text-grey-light'
          break
      }

      return className
    },
    loadSources() {
      this.$axios
        .$get(`${process.env.API_ENDPOINT}/admin/sources`, {
          headers: {
            Authorization: `${this.$store.getters.auth.type} ${
              this.$store.getters.auth.token
            }`
          }
        })
        .then(res => {
          if (res.statusCode === 200) {
            this.sources = res.data
          }
        })
        .catch(err => {
          console.log('GOT ERROR')
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.is-running {
  color: #23d160;
}
.inline-block {
  display: inline-block;
}
.items-center {
  align-items: center;
}
.list-enter-active,
.list-leave-active,
.list-move {
  transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.list-enter {
  opacity: 0;
  transform: translateX(50px) scaleY(0.5);
}

.list-enter-to {
  opacity: 1;
  transform: translateX(0) scaleY(1);
}

.list-leave-active {
  position: absolute;
}

.list-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: center top;
}
</style>
