<template>
    <button class="orange" :class="mode">
        <slot></slot>
    </button>
</template>

<script setup>
    const props = defineProps(['mode'])
</script>

<style scoped>
    .orange {
        background-color: #333537;
        color:  #fff;
        padding: 7px 15px;
        border-radius: .3rem;
        border: 1px solid #333537;
    }
    .orange:hover {
        background-color: transparent;
        color:  #333537;
        padding: 7px 15px;
        border-radius: .3rem;
        border: 1px solid #333537;
    }
    .reverse {
        background-color: transparent;
        color:  #333537;
        padding: 7px 15px;
        border: 1px solid #333537;
        border-radius: .3rem; 
    }
    .reverse:hover {
        background-color: #333537;
        color:  #fff;
        border-radius: .3rem;
        border: 1px solid #333537;
    }
    .round {
        background-color: #F89829;
        color:  #333537;
        font-weight: 600;
        font-size: 16px;
        padding: 10px 15px;
        width: 30%;
        border-radius: 2.5rem;
        border: 2px solid #F89829;
    }
    .round:hover {
        background-color: transparent;
        color:  #333537;
        padding: 10px 15px;
        border-radius: 2.5rem;
        width: 30%;
        border: 2px solid #333537;
    }
    .round-reverse {
        background-color: transparent;
        color:  #F89829;
        padding: 0;
        border: 0px solid #F89829;
    }
    .round-reverse:hover {
        background-color: transparent;
        color:  #333537;
        padding: 0;
        border: 0px solid #333537;
    }
    @media screen and (max-width: 980px) {
    .round {
        background-color: #F89829;
        color:  #333537;
        font-weight: 600;
        font-size: 16px;
        padding: 9px;
        border-radius: 1.4rem;
        width: 40%;
        border: 2px solid #F89829;
    }
    .round:hover {
        background-color: transparent;
        color:  #333537;
        padding: 9px;
        border-radius: 1.4rem;
        width:40%;
        border: 2px solid #333537;
    }
}
</style>