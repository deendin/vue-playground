<template>
    <div class="col-full" :class="$style.centered">
        <h1 :class="$style.HeadingLarge">Not Found</h1>

        <p :class="$style.textLarge">
            Opps! We couldn't find what you are looking for. 
            <router-link :to="{name: 'Home'}">
                Why don't you go home instead?
            </router-link>
        </p>
    </div>
</template>

<script>
    export default {

    }
</script>

<style module>
    .headingLarge {
        font-size: 100px;
    }
    .textLarge {
        font-size: 50px;
        font-weight: 100;
    }
    .centered {
        text-align: center;
    }
</style>