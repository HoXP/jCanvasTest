﻿from django.conf.urls import include, url
from Main import views as main

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = [
    # Examples:
    # url(r'^$', 'JCanvasTest.views.home', name='home'),
    # url(r'^JCanvasTest/', include('JCanvasTest.JCanvasTest.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
    url(r'^$', main.index, name='index'),
    url(r'^sort/bubble$', main.sort_bubble, name='sort_bubble'),
    url(r'^ajax/tool/$', main.ajax_tool, name='ajax_tool'),
]