<template>
    <div class="head-box">
        <div class="container">
            <div class="logo-box"><img src="../assets/logo.png" alt="logo"></div>
            <h2 class="tit">货物跟踪</h2>
        </div>
    </div>
</template>

<style scoped>
.container {
    position: relative;
}
.head-box {
    border-bottom: 1px solid #ccc;
    padding: 1rem 0;
}

.logo-box {
    width: 200px;
}
.logo-box img {
    display: block;
    width: 100%;
}

.tit {
    position: absolute;
    left: 45%;
    top: 0;
    line-height: 50px;
    font-weight: 600;
    color: rgb(11, 26, 71);
}
@media (max-width: 968px) {
    .container {
        width: 95%;
    }
    .logo-box {
        width: 35%;
    }
    .tit {
        line-height: 2rem;
    }
}
</style>