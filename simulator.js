var Simulator;
!function () {
    "use strict";
    Simulator = {
        SIDE_ATTACKER: "attacker",
        SIDE_DEFENDER: "defender",
        prefixes: {
            attacker: "att",
            defender: "def"
        },
        $form: null,
        benefits: {
            attacker: [],
            defender: []
        },
        init: function () {
            var e = this.$form = $("#simulator_form");
            e.submit(function (t) {
                e.find("input[name=att_benefits]").val(Simulator.formatBenefitsForTransmission(Simulator.benefits.attacker)),
                    e.find("input[name=def_benefits]").val(Simulator.formatBenefitsForTransmission(Simulator.benefits.defender))
            }),
                $(".btn-benefit-create").on("click", function (e) {
                    e.preventDefault(),
                        Simulator.BenefitCreator.open($(this).data("side"))
                }),
                this.Filler.init(),
                this.EffectTemplates.init(),
                $("#catapult_wall").change(function () {
                    Simulator.handleCatapultTarget()
                }),
                Simulator.handleCatapultTarget()
        },
        handleCatapultTarget: function () {
            $("#catapult_wall").prop("checked") ? ($("#catapult_input").find(":input").prop("disabled", !0), $("#catapult_lvl_disabled_overlay").show()) : ($("#catapult_input").find(":input").prop("disabled", !1), $("#catapult_lvl_disabled_overlay").hide())
        },
        setMorale: function (e) {
            $("#moral").val(e)
        },
        addBenefits: function (e, t) {
            e.forEach(function (e) {
                Simulator.addBenefit(e, t)
            })
        },
        addBenefit: function (e, t) {
            var i = this.generateBenefitElement(e, t);
            $("#" + this.prefixes[t] + "_benefits_display").append(i),
                this.benefits[t].push(e)
        },
        removeBenefit: function (e, t) {
            $("#" + this.prefixes[e] + "_benefits_display").find("li:nth-child(" + (t + 1) + ")").detach(),
                this.benefits[e].splice(t, 1)
        },
        removeAllBenefits: function (e) {
            for (; this.benefits[e].length > 0;)
                this.removeBenefit(e, 0)
        },
        generateBenefitElement: function (e, t) {
            var i = '<span class="description">' + e.instance.description + "</span>",
                a = '<img class="effect-icon" src="' + e.instance.icon_src + '">',
                l = '<img class="remove-icon" src="' + Format.image_src("delete.png") + '">';
            return $('<li class="benefit-item">' + l + a + " " + i + "</li>").on("click", function () {
                var e = $(this).closest("li").prevAll().length;
                Simulator.removeBenefit(t, e)
            })
        },
        formatBenefitsForTransmission: function (e) {
            return JSON.stringify(e.map(function (e) {
                var t = $.extend(!0, {}, e);
                return delete t.instance, t
            }))
        },
        Filler: {
            templates: {
                attacker: {
                    current_village: null,
                    last_sim: null
                },
                defender: {
                    current_village: null,
                    last_sim: null,
                    sim_survivors: null
                }
            },
            init: function () {
                var e = this;
                $("#att_fill_select").change(function (t) {
                    t.preventDefault();
                    var i = e.templates.attacker[this.value];
                    i && e.fillAttacker(i)
                }),
                    $("#def_fill_select").change(function (t) {
                        t.preventDefault();
                        var i = e.templates.defender[this.value];
                        i && (e.fillDefender(i), $("#is_rune").prop("checked", i.is_rune_village), $("#is_night").prop("checked", i.has_night_bonus))
                    }),
                    $("#def_survivor_fill").on("click", function (t) {
                        t.preventDefault();
                        var i = e.templates.attacker.last_sim.catapult_target;
                        e.fillDefender(e.templates.defender.sim_survivors, i)
                    }),
                    $("#reset_att_units").on("click", function (t) {
                        t.preventDefault(),
                            e.fillSide(Simulator.SIDE_ATTACKER, e.templates.attacker.reset),
                            $("#att_fill_select").val("")
                    }),
                    $("#reset_def_units").on("click", function (t) {
                        t.preventDefault(),
                            e.fillSide(Simulator.SIDE_DEFENDER, e.templates.defender.reset),
                            $("#def_fill_select").val(""),
                            $("#wall_id").val(""),
                            $("#is_rune").prop("checked", !1),
                            $("#is_night").prop("checked", !1)
                    })
            },
            addTemplate: function (e, t, i) {
                this.templates[e][t] = i
            },
            fillSide: function (e, t) {
                var i = Simulator.prefixes[e];
                (t.fill.units && this.fillUnits(e, t), t.fill.tech && this.fillTech(e, t), t.fill.belief && this.getInputByName("belief_" + i).prop("checked", t.is_believer), t.fill.knight_items) && this.getInputByName(i + "_knight_items\\[\\]").find("option").each(function (e, i) {
                    var a = $(i);
                    a.prop("selected", -1 !== t.knight_items.indexOf(a.val()))
                });
                t.fill.flag && this.getInputByName(i + "_flag").val(t.flag_level),
                    t.fill.benefits && (Simulator.removeAllBenefits(e), t.benefits.forEach(function (t) {
                        Simulator.addBenefit(t, e)
                    }), Simulator.EffectTemplates.addBenefitsFromSelectedTemplate(e))
            },
            fillUnits: function (e, t) {
                var i = this,
                    a = Simulator.prefixes[e];
                $.each(t.unit_counts, function (e, t) {
                    i.getInputByName(a + "_" + e).val(t > 0 ? t : "")
                })
            },
            fillTech: function (e, t) {
                var i = this,
                    a = Simulator.prefixes[e];
                $.each(t.tech_levels, function (e, t) {
                    i.getInputByName(a + "_tech_" + e).val(t > 0 ? t : "")
                })
            },
            fillAttacker: function (e) {
                this.fillSide(Simulator.SIDE_ATTACKER, e)
            },
            fillDefender: function (e, t) {
                this.fillSide(Simulator.SIDE_DEFENDER, e),
                    e.fill.buildings && (this.getInputByName("def_wall").val(e.buildings.wall ? e.buildings.wall : ""), this.getInputByName("def_farm").val(e.buildings.farm), t && this.getInputByName("def_building").val(e.buildings[t]), $("#is_church").is(":checked") && this.getInputByName("def_building").val(e.buildings.church), $("#is_farm").is(":checked") && this.getInputByName("def_building").val(e.buildings.farm)),
                    e.fill.village_bonus_id && this.getInputByName("village_bonus_id").val(e.village_bonus_id)
            },
            getInputByName: function (e) {
                return Simulator.$form.find("[name=" + e + "]")
            },
            addBenefitsFromSelectedVillage: function (e) {
                if (e == Simulator.SIDE_ATTACKER)
                    var t = $("#att_fill_select");
                else
                    t = $("#def_fill_select");
                var i = $(t).val();
                Simulator.addBenefits(Simulator.Filler.templates[e][i].benefits, e)
            }
        },
        MoraleCalculator: {
            PERSPECTIVE_ATTACKER: "attacker",
            PERSPECTIVE_DEFENDER: "defender",
            perspective: null,
            calculated_morale: null,
            open: function () {
                var e = this,
                    t = $("input[name=morale_type]:checked").val();
                return Dialog.fetch("morale_calculator", "place", {
                    ajax: "morale_calculator",
                    type: t
                }, function () {
                    e.switchPerspective(e.PERSPECTIVE_ATTACKER);
                    var i = $("#morale_calculator");
                    i.find(".menu-item").click(function () {
                        e.switchPerspective($(this).data("perspective"))
                    }),
                        i.find("form").submit(function (i) {
                            i.preventDefault(),
                                e.calculateMorale(t)
                        })
                }, {}, function () {
                    e.perspective = null
                }), !1
            },
            calculateMorale: function (e) {
                var t = this.getActiveForm().serializeArray();
                t.push({
                    name: "perspective",
                    value: this.perspective
                });
                var i = this;
                TribalWars.post("place", {
                    ajax: "calculate_morale",
                    type: e
                }, t, function (e) {
                    i.setAttackerName(""),
                        i.setAttackerPoints(e.attacker_points),
                        i.setDefenderName(""),
                        i.setDefenderPoints(e.defender_points),
                        i.setDaysPlayed(e.days_played),
                        i.setMorale(e.morale)
                })
            },
            setAttackerName: function (e) {
                return this.getActiveForm().find("input[name=attacker_name]").val(e), !1
            },
            setDefenderName: function (e) {
                return this.getActiveForm().find("input[name=defender_name]").val(e), !1
            },
            setAttackerPoints: function (e) {
                return this.getActiveForm().find("input[name=attacker_points]").val(e), !1
            },
            setDefenderPoints: function (e) {
                return this.getActiveForm().find("input[name=defender_points]").val(e), !1
            },
            setDaysPlayed: function (e) {
                return this.getActiveForm().find("input[name=days_played]").val(e), !1
            },
            setMorale: function (e) {
                this.calculated_morale = e;
                var t = $("#morale_calculator").find(".result_display");
                return t.find(".morale").html(e), t.show(), !1
            },
            getActiveForm: function () {
                return $("#morale_calculator").find("form." + this.perspective)
            },
            switchPerspective: function (e) {
                if (e !== this.perspective) {
                    this.perspective = e;
                    var t = e === this.PERSPECTIVE_ATTACKER ? this.PERSPECTIVE_DEFENDER : this.PERSPECTIVE_ATTACKER;
                    this.getActiveForm().show();
                    var i = $("#morale_calculator");
                    i.find("form." + t).hide(),
                        i.find(".menu-item[data-perspective=" + e + "]").addClass("selected"),
                        i.find(".menu-item[data-perspective=" + t + "]").removeClass("selected"),
                        i.find(".result_display").hide()
                }
            },
            pasteResultToSimulator: function () {
                Simulator.setMorale(this.calculated_morale),
                    Dialog.close()
            }
        },
        BenefitCreator: {
            possibilities: {
                attacker: [],
                defender: []
            },
            addPossibilities: function (e, t) {
                var i = this;
                $.each(e, function (e, a) {
                    i.possibilities[t].push($.extend(Object.create(i.PossibleBenefit), a))
                })
            },
            open: function (e) {
                var t = '<h2 class="popup_box_header">' + _("df0a38410861dc773fced203680d19d3") + '</h2><form id="benefit_creator_form"><input type="hidden" name="side" value="' + e + '"><div class="attribute-input">' + _("29e9b14315473eb6c2769b8ddf0540a4") + ' <select name="type">';
                this.possibilities[e].forEach(function (i, a) {
                    t += '<option value="' + i.type + '" data-side="' + e + '" data-index="' + a + '">' + i.name + "</option>"
                }),
                    t += '</select></div><div class="variable-inputs"></div>';
                var i = e === Simulator.SIDE_ATTACKER ? _("56e022653b34cddcce4b8f5b941b7e20") : _("76c50feb6d03f4620361bdea1953ca07");
                t += '<div class="center"><a href="#" class="btn btn-default">' + i + "</a></div></form>",
                    Dialog.show("benefit_creator", t);
                var a = this,
                    l = $("#benefit_creator_form");
                l.find('select[name="type"]').change(function () {
                    a.handleTypeSwitch()
                }),
                    l.find(".btn").click(function (e) {
                        e.preventDefault(),
                            a.finishBenefit()
                    }),
                    this.handleTypeSwitch()
            },
            handleTypeSwitch: function () {
                var e = $("#benefit_creator_form"),
                    t = e.find('select[name="type"]').find("option:selected");
                e.find(".variable-inputs").html(this.possibilities[t.data("side")][t.data("index")].generateUI())
            },
            finishBenefit: function () {
                TribalWars.post("place", {
                    ajax: "create_benefit"
                }, $("#benefit_creator_form").serializeArray(), function (e) {
                    Simulator.addBenefit(e.benefit, e.side),
                        Dialog.close()
                })
            },
            PossibleBenefit: {
                TYPE_UNITSTAT: "b_unitstat",
                TYPE_FLAG: "b_flag",
                type: null,
                name: "",
                inputs: [],
                generateUI: function () {
                    var e = "";
                    return this.inputs.forEach(function (t, i) {
                        if ("hidden" !== t.type) {
                            if (e += '<div class="attribute-input">' + t.label + ' <select name="inputs[]">', "int" === t.type)
                                for (var a = t.max; a >= t.min; a--) {
                                    var l = a === t.default_selection ? "selected" : "";
                                    e += '<option value="' + a + '" ' + l + ">" + (a < 0 ? "" : "+") + a + "%</option>"
                                }
                            else
                                "enum" === t.type && t.options.forEach(function (t, i) {
                                    e += '<option value="' + t.value + '">' + escapeHtml(t.description) + "</option>"
                                });
                            e += "</select></div>"
                        } else
                            e += '<input type="hidden" name="inputs[]" value="' + t.value + '">'
                    }), e
                }
            }
        },
        EffectTemplates: {
            benefits: {
                attacker: [],
                defender: []
            },
            init: function () {
                $("#attack_effect_templates").on("change", function (e) {
                    if (this.value < 0)
                        return Simulator.removeAllBenefits(Simulator.SIDE_ATTACKER), $("#del_att_temp").prop("disabled", !0), $('input[name="att_template_name"]').val(""), void Simulator.Filler.addBenefitsFromSelectedVillage(Simulator.SIDE_ATTACKER);
                    e.preventDefault();
                    var t = Simulator.EffectTemplates.benefits.attacker[this.value];
                    Simulator.removeAllBenefits(Simulator.SIDE_ATTACKER),
                        Simulator.addBenefits(t.benefits, Simulator.SIDE_ATTACKER),
                        Simulator.Filler.addBenefitsFromSelectedVillage(Simulator.SIDE_ATTACKER),
                        $('input[name="att_template_name"]').val(t.name),
                        $("#del_att_temp").prop("disabled", !1).attr("href", TribalWars.buildURL("GET", {
                            action: "delete_effect_template",
                            screen: "place",
                            mode: "sim",
                            id: t.id
                        }))
                }),
                    $("#defense_effect_templates").on("change", function (e) {
                        if (this.value < 0)
                            return Simulator.removeAllBenefits(Simulator.SIDE_DEFENDER), $("#del_def_temp").prop("disabled", !0), $('input[name="def_template_name"]').val(""), void Simulator.Filler.addBenefitsFromSelectedVillage(Simulator.SIDE_DEFENDER);
                        e.preventDefault();
                        var t = Simulator.EffectTemplates.benefits.defender[this.value];
                        Simulator.removeAllBenefits(Simulator.SIDE_DEFENDER),
                            Simulator.addBenefits(t.benefits, Simulator.SIDE_DEFENDER),
                            Simulator.Filler.addBenefitsFromSelectedVillage(Simulator.SIDE_DEFENDER),
                            $('input[name="def_template_name"]').val(t.name),
                            $("#del_def_temp").prop("disabled", !1).attr("href", TribalWars.buildURL("GET", {
                                action: "delete_effect_template",
                                screen: "place",
                                mode: "sim",
                                id: t.id
                            }))
                    }),
                    $("#save_att_template").on("click", function () {
                        Simulator.EffectTemplates.saveTemplate({
                            template_name: $('input[name="att_template_name"]').val(),
                            effects: Simulator.benefits.attacker,
                            type: 0,
                            confirm: !1
                        })
                    }),
                    $("#save_def_template").on("click", function () {
                        Simulator.EffectTemplates.saveTemplate({
                            template_name: $('input[name="def_template_name"]').val(),
                            effects: Simulator.benefits.defender,
                            type: 1,
                            confirm: !1
                        })
                    }),
                    $("#del_att_temp, #del_def_temp").on("click", function (e) {
                        var t = $(e.target).attr("data-side");
                        Simulator.EffectTemplates.removeTemplate(t)
                    })
            },
            addTemplate: function (e) {
                var t = this.sideFromType(e.type);
                Simulator.EffectTemplates.benefits[t][e.id] = e
            },
            addTemplates: function (e) {
                e.forEach(function (e) {
                    Simulator.EffectTemplates.addTemplate(e)
                })
            },
            removeTemplate: function (e) {
                if (e == Simulator.SIDE_ATTACKER)
                    var t = $("#attack_effect_templates");
                else
                    t = $("#defense_effect_templates");
                var i = $(t).val();
                $(t).find(":selected").remove(),
                    delete Simulator.EffectTemplates.benefits[e][i];
                var a = {
                    text: _("f2a6c498fb90ee345d997f888fce3b18"),
                    confirm: !0,
                    callback: function () {
                        TribalWars.post("place", {
                            ajax: "delete_effect_template"
                        }, {
                            id: i
                        }, function (e) {
                            1 == parseInt(e.status) ? (UI.SuccessMessage(e.message), $(t).val(-1).trigger("change")) : UI.ErrorMessage(e.message)
                        }, function () {
                            UI.ErrorMessage(_("c6701602de1528fd79d5eff3e8eb1edd"))
                        })
                    }
                };
                UI.ConfirmationBox(_("eba24b6def56e1a205e3f30a6582c101"), [a])
            },
            saveTemplate: function (e) {
                var t = this.sideFromType(e.type);
                TribalWars.post("place", {
                    ajax: "add_effect_template"
                }, e, function (i) {
                    switch (parseInt(i.status)) {
                        case 1:
                            if (UI.SuccessMessage(i.message), Simulator.EffectTemplates.addTemplate(i.template), 0 == $('.template-list>option[value="' + i.template.id + '"]').length) {
                                if (t == Simulator.SIDE_ATTACKER)
                                    var a = $("#attack_effect_templates");
                                else
                                    a = $("#defense_effect_templates");
                                $('<option value="' + i.template.id + '">' + i.template.name + "</option>").appendTo(a).prop("selected", !0),
                                    $(a).trigger("change")
                            }
                            break;
                        case 0:
                            UI.ErrorMessage(i.message);
                            break;
                        case -1:
                            var l = e;
                            l.confirm = !0;
                            var n = {
                                text: _("da364eb37e143f6b2b5559aa03f5913a"),
                                confirm: !0,
                                callback: function () {
                                    Simulator.EffectTemplates.saveTemplate(l)
                                }
                            };
                            UI.ConfirmationBox(i.message, [n], "confirm-overwite-template", !1, !0, !1)
                    }
                }, function (e) {
                    UI.ErrorMessage(e.message)
                })
            },
            sideFromType: function (e) {
                return 0 === e ? Simulator.SIDE_ATTACKER : Simulator.SIDE_DEFENDER
            },
            addBenefitsFromSelectedTemplate: function (e) {
                if (e == Simulator.SIDE_ATTACKER)
                    var t = $("#attack_effect_templates");
                else
                    t = $("#defense_effect_templates");
                var i = $(t).val();
                i > 0 && Simulator.addBenefits(Simulator.EffectTemplates.benefits[e][i].benefits, e)
            }
        }
    }
}();

