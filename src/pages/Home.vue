<template>
  <div>

    <!-- <SubNav></SubNav> -->

    <div class="row">
      <div class="col-lg-3">
        <div class="card bg-primary mb-5">
          <div class="card-body text-center">
            <h1 class="h1 text-white mb-1 font-weight-bold">&euro; 12.035,51</h1>
            <h2 class="h5 text-light font-weight-normal">2.41231 BTC</h2>
          </div>
        </div>
      </div>

    </div>

    <div class="row row-flush">
      <div class="col-6 col-sm-6 col-lg-3">
        <CardTrade></CardTrade>
      </div>
      <div class="col-6 col-sm-6 col-lg-3">
        <CardTrade></CardTrade>
      </div>
      <div class="col-6 col-sm-6 col-lg-3">
        <CardTrade></CardTrade>
      </div>
      <div class="col-6 col-sm-6 col-lg-3">
        <CardTrade></CardTrade>
      </div>
      <!-- <div class="col-6 col-lg-3">
        <div class="card mb-5">
          <div class="card-body">
            <div class="card-value pull-right text-red">-3%</div>
            <h3 class="mb-1">423</h3>
            <div class="text-muted">Users online</div>
          </div>
          <div class="card-chart-bg">
            <img src="http://placehold.it/500x200" class="img-fluid" />
          </div>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="card mb-5">
          <div class="card-body">
            <div class="card-value pull-right text-green">-3%</div>
            <h3 class="mb-1">423</h3>
            <div class="text-muted">Users online</div>
          </div>
          <div class="card-chart-bg">
            <img src="http://placehold.it/500x200" class="img-fluid" />
          </div>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="card mb-5">
          <div class="card-body">
            <div class="card-value pull-right text-yellow">9%</div>
            <h3 class="mb-1">423</h3>
            <div class="text-muted">Users online</div>
          </div>
          <div class="card-chart-bg">
            <img src="http://placehold.it/500x200" class="img-fluid" />
          </div>
        </div>
      </div> -->
    </div>
    <div class="row align-items-center flex-row-reverse">
      <div class="col-lg-6">
        <div class="card mb-5">
          <div class="card-header">
            <h5 class="card-title m-0">Card title</h5>
          </div>
          <div class="card-body">
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card mb-5">
          <div class="card-header">
            <h5 class="card-title m-0">Card title</h5>
          </div>
          <ul class="list-group list-group-flush">
            <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <strong class="p2">XVG<span class="font-weight-light text-muted">/BTC</span></strong>
              Cras justo odio
              <span class="badge badge-primary badge-pill">0</span>
            </a>
            <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <strong>XVG<span class="font-weight-light text-muted">/BTC</span></strong>
              Dapibus ac facilisis in
              <span class="badge badge-success badge-pill">+53,65%</span>
            </a>
            <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <strong>XVG<span class="font-weight-light text-muted">/BTC</span></strong>
              Morbi leo risus
              <span class="badge badge-danger badge-pill">-20,21%</span>
            </a>
          </ul>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card mb-5">
          <div class="card-header">
            <h5 class="card-title m-0">Watchlist</h5>
          </div>
          <ul class="list-group list-group-flush">
            <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <strong class="p2">XVG<span class="font-weight-light text-muted">/BTC</span></strong>
              Cras justo odio
              <span class="badge badge-primary badge-pill">0</span>
            </a>
            <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <strong>XVG<span class="font-weight-light text-muted">/BTC</span></strong>
              Dapibus ac facilisis in
              <span class="badge badge-success badge-pill">+53,65%</span>
            </a>
            <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <strong>XVG<span class="font-weight-light text-muted">/BTC</span></strong>
              Morbi leo risus
              <span class="badge badge-danger badge-pill">-20,21%</span>
            </a>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubNav from '../components/SubNav.vue'
import CardTrade from '../components/CardTrade.vue'
import EmptyState from '../components/EmptyState.vue'

export default {
  name: 'PageHome',
  components: {
    SubNav,
    CardTrade,
    EmptyState
  }
}
</script>
